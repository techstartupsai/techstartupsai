create extension if not exists vector;

create table blog_posts (
  slug text primary key,
  category text not null check (category in ('soonicorn-of-the-month', 'news-room', 'tech-scene')),
  title text not null,
  excerpt text not null,
  author text not null default 'TechStartups AI',
  publication_date date not null,
  cover_image text,
  og_image text,
  featured boolean default false,
  tags text[] default '{}',
  startup_metadata jsonb,
  plain_text text not null,
  embedding vector(1536) not null,
  embedding_model text not null,
  content_hash text not null,
  search_tsv tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(plain_text, '')), 'C')
  ) stored,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index blog_posts_embedding_idx on blog_posts using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index blog_posts_search_idx on blog_posts using gin (search_tsv);
create index blog_posts_tags_idx on blog_posts using gin (tags);
create index blog_posts_category_publication_idx on blog_posts (category, publication_date desc);

alter table blog_posts enable row level security;
create policy "public read" on blog_posts for select using (true);
