alter table blog_posts
  add column if not exists author_url text,
  add column if not exists reading_time text;
