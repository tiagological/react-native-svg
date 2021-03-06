import { idPattern } from '../util';
import { ClipProps } from './types';

const clipRules: { evenodd: number; nonzero: number } = {
  evenodd: 0,
  nonzero: 1,
};

export default function extractClipPath(props: ClipProps) {
  const { clipPath, clipRule } = props;
  const extracted: {
    clipPath?: string;
    clipRule?: number;
  } = {};

  if (clipRule) {
    extracted.clipRule = clipRules[clipRule] === 0 ? 0 : 1;
  }

  if (clipPath) {
    const matched = clipPath.match(idPattern);

    if (matched) {
      extracted.clipPath = matched[1];
    } else {
      console.warn(
        'Invalid `clipPath` prop, expected a clipPath like "#id", but got: "' +
          clipPath +
          '"',
      );
    }
  }

  return extracted;
}
