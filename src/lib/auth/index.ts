import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserAttribute,
	CognitoUserPool,
	CognitoUserSession
} from 'amazon-cognito-identity-js';
import type { User } from '@types';

export class Authenticator {
	private UserPool: CognitoUserPool;
	private UserSession: CognitoUserSession | null = null;
	public User: CognitoUser | null = null;
	public ErrorLogger: Error[] = [];

	constructor(UserPoolId: string, ClientId: string) {
		const PoolData = { UserPoolId, ClientId };
		this.UserPool = new CognitoUserPool(PoolData);
	}

	public signIn(email: string, password: string) {
		const authData = {
			Username: email,
			Password: password
		};

		const authDetails = new AuthenticationDetails(authData);

		const userData = { Username: email, Pool: this.UserPool };

		const cognitoUser = new CognitoUser(userData);

		cognitoUser.authenticateUser(authDetails, {
			onFailure: (error) => {
				this.ErrorLogger.push(error);
			},
			onSuccess: (session: CognitoUserSession) => {
				this.UserSession = session;
			}
		});
	}

	public signOut() {
		if (!this.User) {
			this.ErrorLogger.push(new Error('No user in memory'));
			return;
		}

		this.User.signOut();
	}

	public registerUser(user: User) {
		const attributeList: CognitoUserAttribute[] = [];

		const rawAttributes = [
			{ Name: 'email', Value: user.email },
			{ Name: 'name', Value: user.name },
			{ Name: 'lastname', Value: user.lastname },
			{ Name: 'address', Value: user.address },
			{ Name: 'custom:region_id', Value: user.region_id },
			{ Name: 'custom:location_id', Value: user.location_id }
		];

		rawAttributes.forEach((attribute) => {
			attributeList.push(new CognitoUserAttribute(attribute));
		});

		this.UserPool.signUp(user.email, user.password, attributeList, [], (error, result) => {
			if (error) this.ErrorLogger.push(error);
			if (result) {
				this.User = result.user;
			}
		});
	}

	public confirmRegistration(code: string) {
		if (!this.User) {
			this.ErrorLogger.push(new Error('No user in memory'));
			return;
		}

		this.User.confirmRegistration(code, true, (error, result) => {
			if (error) this.ErrorLogger.push(error);
			if (result) {
				// DO SOMETHING WITH RESULT!
				console.log(result);
			}
		});
	}

	public resendConfitmationCode() {
		if (!this.User) {
			this.ErrorLogger.push(new Error('No user in memory'));
			return;
		}

		this.User.resendConfirmationCode((error, result) => {
			if (error) this.ErrorLogger.push(error);
			if (result) {
				// DO SOMETHING WITH RESULT!
				console.log(result);
			}
		});
	}

	public updateAttribute(Name: string, Value: string) {
		const attributeList: CognitoUserAttribute[] = [new CognitoUserAttribute({ Name, Value })];

		if (!this.User) {
			this.ErrorLogger.push(new Error('No user in memory'));
			return;
		}

		this.User.updateAttributes(attributeList, (error, result) => {
			if (error) this.ErrorLogger.push(error);
			if (result) {
				// DO SOMETHING WITH RESULT!
				console.log(result);
			}
		});
	}

	public changePassword(oldPassword: string, newPassword: string) {
		if (!this.User) {
			this.ErrorLogger.push(new Error('No user in memory'));
			return;
		}

		this.User.changePassword(oldPassword, newPassword, (error, result) => {
			if (error) this.ErrorLogger.push(error);
			if (result) {
				// DO SOMETHING WITH RESULT!
				console.log(result);
			}
		});
	}
}
