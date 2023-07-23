# ShareMyCode
ShareMyCode 2.0 - An alternative to codeshare.io

[Link to original idea made for a hackathon in Fall 2020](https://github.com/RickyC0626-forks/sharemycode)

## Roadmap

- [X] Code editor (using CodeMirror)
  - [X] Syntax highlighting
    - [ ] Detect using file name
    - [X] Detect using selected language mode
  - [X] Line numbers
  - [/] File explorer
    - [/] Create new file
      - [ ] Display input form in explorer to get file name
        - [ ] If clicked outside or pressed 'Esc', cancel form
        - [ ] Validate allowed file name for major operating systems
        - [ ] Submit form if valid file name is given
      - [/] Create file node in database
        - [ ] By default, nest under root node
        - [ ] If new file created under a different folder node, nest the file node under that
        - [ ] Create path to file node from root node as unique string identifier
    - [/] Create new folder
  - [/] Opened file header tabs
- [ ] Real-time collaboration (using Liveblocks)
  - [ ] User list
  - [ ] [Live carets](https://liveblocks.io/presence) in editor
  - [ ] [Live avatar stack](https://liveblocks.io/presence) in opened file header and file explorer
