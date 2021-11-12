module.exports = {
    siteMetadata: {
        siteUrl: "https://www.yourdomain.tld",
        title: "marineterrein",
    },
    plugins: [{
        resolve: "gatsby-plugin-react-svg",
        options: {
            rule: {
                include: /\.inline\.svg$/,
            }
        }
    }, {
        resolve: `gatsby-plugin-styled-components`,
        options: {
            // Add any options here
        },

    }, { resolve: `gatsby-plugin-no-sourcemaps` }, ],
};