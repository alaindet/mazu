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
