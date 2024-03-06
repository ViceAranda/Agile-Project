# Usage:

## Get Profile:

Use the `GET` method as:

```TS
const response = await fetch("/api/profile?user_id=1");
```

## Update the profile:

You are able to update any or all of the following values:

- `firstname`
- `lastname`
- `address`

```TS

const body = { userId: 2, firstname: "John", lastname: "Doe", address: "742 Evergreen Terrace" };

// These are also valid requests:
// const body = { userId: 2, firstname: "John" };
// const body = { userId: 2, lastname: "Doe", address: "742 Evergreen Terrace" };

const response = await fetch("/api/profile", { method "PUT", body: JSON.stringify(body) });
```
