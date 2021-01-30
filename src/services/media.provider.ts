
export const localImage = (image: string) => {
  return require('@public/images/' + image);
};

export const urlLocalImage = (image: string) => {
  return `url(${ localImage(image) })`;
};

