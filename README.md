# Cloudinary Sass

Responsive background images are hard to get right, especially `background-image` rules that take advantage of `background-size:cover`. The `image-set` CSS function isn't widely adopted yet but the prefixed `-webkit-image-set` is supported by most browsers. This library adds a Sass `@mixin` for applying `background-image` rules with `image-set` / `-webkit-image-set` properties at various resolutions. It does so via a set of Sass `@function` definitions.

Cloudinary is a great service for resizing full sized images, applying automatic art direction, and delivering them over their fast CDN in a well-optimized file format for the connecting device. This library also provides Sass `@mixin` and `@function` definitions to generate downsized Cloudinary URLs for a given full-sized image URL.

## Installation

```sh
npm install -D cloudinary-sass
```

## Usage

```scss
@import "cloudinary-sass";

$CLOUDINARY_CLOUD_NAME: "my-cloud-name";

$resized-image-url: cloudinary-url("example.png", $width: 400, $crop: "fill");
// https://res.cloudinary.com/my-cloud-name/image/upload/w_400,c_fill/example.png

$responsive-image-urls: cloudinary-responsive-urls("example.png", (
  1x: (width: 420, crop: crop, gravity: faces, zoom: 1.2),
  2x: (width: 760),
  3x: (width: 1080),
  4x: (width: 1400),
  5x: (width: 2060),
));
//  (
//    https://res.cloudinary.com/my-cloud-name/image/upload/w_420,c_crop,g_faces,z_1.2/example.png 1x,
//    https://res.cloudinary.com/my-cloud-name/image/upload/w_760/example.png 2x,
//    https://res.cloudinary.com/my-cloud-name/image/upload/w_1080/example.png 3x,
//    https://res.cloudinary.com/my-cloud-name/image/upload/w_1400/example.png 4x,
//    https://res.cloudinary.com/my-cloud-name/image/upload/w_2060/example.png 5x
//  )

header.hero-image {
  @include cloudinary-background-image(
    "https://example.com/path/to/image.png",
    (
      1x: (width: 420),
      2x: (width: 760),
      3x: (width: 1080)
    ),
    $type: fetch,
    $prefixed: false,
    // because you're already using autoprefixer
  );
  background-size: cover;
}
/*
header.hero-image {
  background-image: image-set(
    https://res.cloudinary.com/my-cloud-name/image/fetch/w_420/https://example.com/path/to/image.png 1x,
    https://res.cloudinary.com/my-cloud-name/image/fetch/w_760/https://example.com/path/to/image.png 2x,
    https://res.cloudinary.com/my-cloud-name/image/fetch/w_1080/https://example.com/path/to/image.png 3x,
  );
  background-size: cover;
}
*/
```
