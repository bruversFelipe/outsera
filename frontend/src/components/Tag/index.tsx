import type { TagProps } from "./types";

import TagWrapper from "./style";

const Tag = ({ color, text }: TagProps) => <TagWrapper color={color}>{text}</TagWrapper>;

export default Tag;
