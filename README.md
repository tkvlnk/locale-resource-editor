# Locale Resource Editor


This package provides a way to comfortably review and edit your localisation resources.

![Screenshot](https://raw.githubusercontent.com/tkvlnk/locale-resource-editor/master/docs/img.png)

## CLI

To launch web app ui to edit locale resources run command below under the root of your project

```
lre -s "public/locales"
```

### Breakdown of available options

```
$ lre --help

Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -p, --port         Port to run editor                 [number] [default: 3000]
  -s, --sourceDir    Root folder of locale resources         [string] [required]
  -f, --filesPrefix  Prefix of the files name in "sourceDir" directory before
                     locale part. F.e. "messages_" for "messages_en.json",
                     "messages_ru.json"          [string] [default: "messages_"]
```
