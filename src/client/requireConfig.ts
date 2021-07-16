requirejs.config({
    baseUrl: "js",
    paths: {
        "babylonjs": "https://cdnjs.cloudflare.com/ajax/libs/babylonjs/4.2.0/babylon",
        "babylonjs-loaders": "https://cdn.jsdelivr.net/npm/babylonjs-loaders@4.2.0/babylonjs.loaders.min"
    }
});

requirejs(["main"], () => { });
