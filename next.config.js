module.exports = {
    env: {
        uriGQL: 'https://server.celo.bigdipper.live/graphql',
        uriAccount: 'https://celo.bigdipper.live/account',
        CELO: 1e18
    },

    publicRuntimeConfig: {
        // Available on both server and client
        setPage: 1,
        pageSize: 15,
        rowXxsmall: 5,
        rowXsmall: 10,
        rowSmall: 15,
        rowMedium: 30,
        rowLarge: 50,
        rowXlarge: 100,

    },

    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }

        return config
    }
}
