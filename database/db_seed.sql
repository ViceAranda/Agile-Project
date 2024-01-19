USE testing_db;

CREATE TABLE IF NOT EXISTS `categories` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE NOT NULL,
  `description` varchar(255)
);

CREATE TABLE IF NOT EXISTS `categories_images` (
  `category_id` integer,
  `image_path` varchar(255)
);

CREATE TABLE IF NOT EXISTS `schools` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `region_id` integer NOT NULL,
  `location_id` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `products` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE NOT NULL,
  `description` varchar(255),
  `price` float NOT NULL,
  `category_id` integer,
  `school_id` integer,
  `stock` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `product_images` (
  `product_id` integer,
  `image_path` varchar(255)
);

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `product_id` integer NOT NULL,
  `score` float NOT NULL,
  `message` varchar(255)
);

CREATE TABLE IF NOT EXISTS `orders` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `cost` float NOT NULL,
  `state_id` integer NOT NULL,
  `requires_delivery` boolean
);

CREATE TABLE IF NOT EXISTS `order_states` (
  `id` integer PRIMARY KEY,
  `state` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS `order_items` (
  `order_id` integer NOT NULL,
  `product_id` integer NOT NULL,
  `qty` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `carts` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `cart_items` (
  `cart_id` integer NOT NULL,
  `product_id` integer NOT NULL,
  `qty` float
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` integer PRIMARY KEY,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `region_id` integer NOT NULL,
  `location_id` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `regions` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS `locations` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `region_id` integer
);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`state_id`) REFERENCES `order_states` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

ALTER TABLE `categories_images` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`);

ALTER TABLE `locations` ADD FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);
