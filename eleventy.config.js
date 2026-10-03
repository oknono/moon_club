export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // The style guide is a local tool; leave it out of the deployed site.
  if (process.env.ELEVENTY_RUN_MODE !== "serve") {
    eleventyConfig.ignores.add("src/styleguide.njk");
  }

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
