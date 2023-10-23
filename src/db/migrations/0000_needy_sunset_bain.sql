CREATE TABLE `npcs` (
	`id` blob PRIMARY KEY NOT NULL,
	`gender` text,
	`name` text,
	`surname` text,
	`race` text,
	`appearance` text,
	`age` text,
	`build` text,
	`description` text,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);
