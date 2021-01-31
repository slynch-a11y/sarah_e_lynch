module.exports = {
    siteMetadata: {
      title: "Sarah E. Lynch",
      author: "Sarah E. Lynch",
      tagline: "accessibility engineer",
      url: "https://www.sarahelynch.com/",
      description: "A blog about digital accessibility.",
      image: "images/cats.png",
      social: {
        twitter: "sarah_e_lynch",
        linkedIn: "sarah-lynch-7257028",
        email: "sarah@alum.rpi.edu",
        github: "slynch-a11y",
      },
    },
    plugins: [
      {
        resolve: "@slynch-a11y/gatsby-theme-a11y-blog",
        options: {
          markdownPath: "src/markdown",
        },
      },
      {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
          trackingIds: [
            "G-6KHCS4XV2D", 
          ],
        },
      },
    ],
  };