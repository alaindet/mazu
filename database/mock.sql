INSERT INTO `user_roles` (`user_role_id`, `name`) VALUES
(1,	'Admin'),
(2,	'User');

INSERT INTO `users` (
  `user_id`,
  `first_name`,
  `last_name`,
  `user_role_id`,
  `email`,
  `password`
) VALUES
(1, 'John', 'Doe', 2, 'john.doe@example.com', '$2y$10$FhLNAZnCGIL2F2RsreF2Ruw7a9jo9c1OFvWTIK/n1UC5YtDuyhDrC');

INSERT INTO `lists` (
  `list_id`,
  `user_id`,
  `is_favorite`,
  `name`,
  `description`
) VALUES
(1, 1, 0, 'Groceries', 'The groceries list');

INSERT INTO `items` (
  `item_id`,
  `user_id`,
  `list_id`,
  `name`,
  `amount`
) VALUES
(1, 1, 1, 'Water', 6),
(2, 1, 1, 'Bread', 1),
(3, 1, 1, 'Milk', 4),
(4, 1, 1, 'Salad', 2),
(5, 1, 1, 'Pasta', 3),
(6, 1, 1, 'chocolate', 2);
