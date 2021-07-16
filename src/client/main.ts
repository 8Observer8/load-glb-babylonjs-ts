import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

function createScene(): BABYLON.Scene
{
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("RotateCamera", 100 * Math.PI / 180, 70 * Math.PI / 180, 15,
        new BABYLON.Vector3(0, 0, 0), scene);
    camera.wheelPrecision = 100;
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    const assetPath = "https://dl.dropboxusercontent.com/s/735ww173uc2t6bh/";
    BABYLON.SceneLoader.Append(assetPath, "gate.glb", scene, (scene) => { });

    const skybox = BABYLON.MeshBuilder.CreateBox("skybox", { size: 1000 }, scene);
    skybox.infiniteDistance = true;
    const skyboxMaterial = new BABYLON.StandardMaterial("skyboxMat", scene);
    skyboxMaterial.backFaceCulling = false;
    const files = [
        "https://dl.dropboxusercontent.com/s/d6pb1vco30tb1qd/skybox_px.jpg",
        "https://dl.dropboxusercontent.com/s/j8r319homxctq46/skybox_py.jpg",
        "https://dl.dropboxusercontent.com/s/owtkos3hjayv819/skybox_pz.jpg",
        "https://dl.dropboxusercontent.com/s/fn49xqtrz18h6vn/skybox_nx.jpg",
        "https://dl.dropboxusercontent.com/s/jdtd2cgpe13930o/skybox_ny.jpg",
        "https://dl.dropboxusercontent.com/s/shin4itwifrypl5/skybox_nz.jpg",
    ];
    skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    engine.runRenderLoop(
        () =>
        {
            scene.render();
        });
    window.onresize =
        () =>
        {
            engine.resize();
        };
    return scene;
}

function main()
{
    createScene();
}

// Debug
main();

// Release
// window.onload = () => main();
