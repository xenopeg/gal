# Gal

A gallery for pretty much everything that just kinda doubles as a knowledge base.

Goal is to support booru-style tags for most kinds of data, be it Markdown, 
images, videos, or 3D models, and allow the creation of "Collections", which
defines how it gets displayed.

In the future it should also allow the creation of public galleries for sharing
one's work.

A remake of an old Rust egui project of mine that never really went anywhere.

I'm also using this project to get familiar with NextJS, TypeScript, and Tailwind.

### Progress

#### Current State

Barely more than a skeleton right now. 
Currently working on setting up UI, state, DB, and Auth

#### ToDo

- [ ] Auth
  - [ ] Permission system
- [ ] Database Structure
  - [x] Tags
  - [ ] Galleries
- [ ] Plain file structure
  - [ ] Based on simplified versions of names
  - [ ] Backing up this structure should keep all the data intact, even if Gal db is lost
    - [ ] Will require some basic file-management UI
    - [ ] Consider how to do thumbnails for large images
      - [ ] Also create thumbnails for Markdown files?
- [ ] UI
  - [ ] Data displays
    - [ ] Types
      - [x] Images
      - [ ] Video
      - [x] Markdown
        - [x] Basic support
        - [ ] Support linking other items
      - [ ] 3D models
    - [ ] Related items?
    - [ ] Searching
      - [ ] Tag search
      - [ ] Autocomplete
  - [ ] List displays
    - [x] Blog
    - [ ] Forum
    - [x] Grid
  - [ ] Themes
    - [ ] Dark-mode
    - [ ] Light-mode
    - [ ] Changeable accent color

#### Next steps
- Posting
  - FileSystem UI, confined to the directory in settings
- Auth