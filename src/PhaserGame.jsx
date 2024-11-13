// src/PhaserGame.jsx
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const PhaserGame = () => {
    const gameRef = useRef(null);

    useEffect(() => {
        // Phaser game configuration
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameRef.current,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        // Initialize Phaser game
        const game = new Phaser.Game(config);

        // Cleanup Phaser instance on component unmount
        return () => {
            game.destroy(true);
        };
    }, []);

    // Phaser scene functions
    function preload() {
        // Load the player sprite sheet
        this.load.spritesheet('player', '/Running (32 x 48).png', {
            frameWidth: 32,
            frameHeight: 48
        });
    
        // Load the Tiled map JSON file
        this.load.tilemapTiledJSON('map', '/map1.json');
    
        // Load each tileset image as per the JSON tileset entries
        this.load.image('WaterFall', '/Pipoya RPG Tileset 32x32/SampleMap/[A]WaterFall_pipo.png');
        this.load.image('BaseChip', '/Pipoya RPG Tileset 32x32/SampleMap/[Base]BaseChip_pipo.png');
        this.load.image('Grass', '/Pipoya RPG Tileset 32x32/SampleMap/[A]Grass_pipo.png');
        this.load.image('Water', '/Pipoya RPG Tileset 32x32/SampleMap/[A]Water_pipo.png');
        this.load.image('Flower', '/Pipoya RPG Tileset 32x32/SampleMap/[A]Flower_pipo.png');
    }
    

    function create() {
        // Create the map
        const map = this.make.tilemap({ key: 'map' });
    
        // Add each tileset to the map, matching the name in the JSON file and the loaded image
        const waterfallTileset = map.addTilesetImage('[A]WaterFall_pipo', 'WaterFall');
        const baseChipTileset = map.addTilesetImage('[Base]BaseChip_pipo', 'BaseChip');
        const grassTileset = map.addTilesetImage('[A]Grass_pipo', 'Grass');
        const waterTileset = map.addTilesetImage('[A]Water_pipo', 'Water');
        const flowerTileset = map.addTilesetImage('[A]Flower_pipo', 'Flower');
        console.log("Tilesets:", waterfallTileset, baseChipTileset, grassTileset, waterTileset, flowerTileset);

        // Create layers from the map using the appropriate tilesets
        const groundLayer = map.createLayer('ground', [waterfallTileset, baseChipTileset, grassTileset, waterTileset, flowerTileset], 0, 0);
        console.log("Layers:", groundLayer);
        const grassLayer = map.createLayer('grass', [waterfallTileset, baseChipTileset, grassTileset, waterTileset, flowerTileset], 0, 0);
        const farmLayer = map.createLayer('farm', [waterfallTileset, baseChipTileset, grassTileset, waterTileset, flowerTileset], 0, 0);
        const farmUpLayer = map.createLayer('farm_up', [waterfallTileset, baseChipTileset, grassTileset, waterTileset, flowerTileset], 0, 0);
        const waterLayer = map.createLayer('water', [waterfallTileset, baseChipTileset, grassTileset, waterTileset, flowerTileset], 0, 0);
        const waterGrassLayer = map.createLayer('water_grass', [waterfallTileset, baseChipTileset, grassTileset, waterTileset, flowerTileset], 0, 0);
        const buildingLayer = map.createLayer('building', [waterfallTileset, baseChipTileset, grassTileset, waterTileset, flowerTileset], 0, 0);
    
        // Create the player sprite
        this.player = this.physics.add.sprite(400, 300, 'player');
    
        // Set up animations and keyboard input
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1 // Loop indefinitely
        });
    
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    function update() {
        const speed = 200;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.anims.play('run', true); // Play the run animation
            this.player.flipX = true; // Flip horizontally for left movement
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play('run', true);
            this.player.flipX = false; // Face right
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.player.anims.play('run', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.player.anims.play('run', true);
        } else {
            this.player.anims.stop(); // Stop animation if no key is pressed
            this.player.setFrame(0); // Set to idle frame
        }
    }

    return <div ref={gameRef} style={{ width: '800px', height: '600px' }} />;
};

export default PhaserGame;
