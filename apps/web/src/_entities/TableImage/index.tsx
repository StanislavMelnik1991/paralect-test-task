import Image from 'next/image';
import { memo } from 'react';
import classes from './index.module.css';

type Props = {
  image?: string
  name: string
};

const CustomImage = ({ image = '', name }: Props) => (
  <Image
    src={image}
    alt={name}
    width={80}
    height={80}
    className={classes.wrapper}
  />
);

export const TableImage = memo(CustomImage);
