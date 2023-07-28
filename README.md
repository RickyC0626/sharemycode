# ShareMyCode (To Be Renamed)
Original idea: alternative to codeshare.io and CodeSandbox

Idea pivot: real-time markdown editor for collaborative knowledge management
- Inspired by Hashnode, an alternative somewhere in between Notion and Obsidian
  - **Notion:** easy to use, proprietary data format, hard to migrate data to another platform
  - **Obsidian:** flexible but higher maintenance, open data format, easy to migrate markdown files to another platform, limited collaborative solutions
  - **Our solution:** easy to use like Notion, open data format and data ownership like Obsidian, flexibility of both Notion and Obsidian, with collaborative hosting solution
- Users can collaborate on a central server but own all their data
- Can make backups to GitHub

## Roadmap

- [X] Markdown editor (using CodeMirror)
  - [X] Syntax highlighting
  - [X] Line numbers
  - [/] File explorer
    - [/] Create new file
      - [ ] Display input form in explorer to get file name
        - [ ] If clicked outside or pressed 'Esc', cancel form
        - [ ] Validate allowed file name for major operating systems
        - [ ] Submit form if valid file name is given
      - [X] Create file node in database
        - [X] By default, nest under root node
        - [X] If new file created under a different folder node, nest the file node under that
        - [X] Create path to file node from root node as unique string identifier
    - [/] Create new folder
  - [/] Opened file header tabs
- [ ] Live preview
- [ ] Real-time collaboration (using Liveblocks)
  - [ ] User list
  - [ ] [Live carets](https://liveblocks.io/presence) in editor
  - [ ] [Live avatar stack](https://liveblocks.io/presence) in opened file header and file explorer
