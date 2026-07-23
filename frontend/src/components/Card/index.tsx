import type { CardProps } from "./types";

import CardWrapper from "./style";

const Card = ({ title, description, children }: CardProps) => (
  <CardWrapper>
    {title && <h3>{title}</h3>}
    {description && <p>{description}</p>}
    {children}
  </CardWrapper>
);

export default Card;
