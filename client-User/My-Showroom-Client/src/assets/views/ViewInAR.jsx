import ARViewer from "./ARViewer";
import IOSARButton from "./IOSARButton";
import { isIOS, isAndroid } from "./device";
import { isIOS, isAndroid } from "../utils/device";

function ViewInAR() {
  if (isAndroid()) return <ARViewer />;
  if (isIOS()) return <IOSARButton />;

  return <p>AR not supported on this device</p>;
}

export default ViewInAR;
