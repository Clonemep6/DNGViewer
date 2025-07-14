import { registerHandler as e } from "@nextcloud/viewer";
import { ImageViewerComponent as r } from "@nextcloud/viewer/dist/components";
e({
  id: "dng-handler",
  component: r,
  mimes: ["image/x-dcraw"],
  group: "image"
});
console.log("🟢 DNG viewer handler registered: using built-in image viewer");
