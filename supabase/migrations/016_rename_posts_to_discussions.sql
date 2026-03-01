-- migration: 016_rename_posts_to_discussions
-- rename cabal_posts → cabal_discussions, cabal_replies → cabal_responses
-- rename post_id → discussion_id in responses table

alter table cabal_posts rename to cabal_discussions;
alter table cabal_replies rename to cabal_responses;
alter table cabal_responses rename column post_id to discussion_id;
