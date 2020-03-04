import * as Scrivito from "scrivito";
import textWidgetIcon from "../../assets/images/text_widget.svg";

Scrivito.provideEditingConfig("TextWidget", {
  title: "Text",
  thumbnail: textWidgetIcon,
  attributes: {
    alignment: {
      title: "Alignment",
      description: "Default: Left",
      values: [
        { value: "left", title: "Left" },
        { value: "center", title: "Center" },
        { value: "right", title: "Right" },
      ],
    },
    text: {
      title: "Text",
      description: "The actual source code of this text",
    },
  },
  properties: ["alignment", "text"],
  initialContent: {
    alignment: "left",
  },
  validations: [
    [
      "text",
      (_ignore, { widget }) => {
        // enqueue the "change handler" in a new browser event
        setTimeout(() => onNewText(widget), 0);

        // we don't actually want to validate anything
        return false;
      },
    ],
  ],
});

// this handler will be invoked when text is changed,
// but it is also sometimes invoked when text is unchanged, e.g. intially.
//
// beware: the handler will be invoked often, so if you need to perform
// a compute-intensive task, use throtteling.
function onNewText(widget) {
  // bail out if the content cannot be changed
  if (!Scrivito.canWrite()) return;

  // this is just a simple example of what one can do with this:
  // if the editor types an umlaut, replace it with a non-umlaut character.
  // make sure that any content manipulation done here is idempotent,
  // to avoid creating endless loops.
  widget.update({ text: replaceUmlauts(widget.get("text")) });
}

function replaceUmlauts(text) {
  const replacements = {
    ä: "a",
    ö: "o",
    ü: "u",
  };

  return text.replace(/[äöü]/g, umlaut => replacements[umlaut]);
}
