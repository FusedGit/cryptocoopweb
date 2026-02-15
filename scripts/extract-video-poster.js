#!/usr/bin/env node

/**
 * Video Poster Frame Extractor
 * 
 * This script helps extract the first frame of a video as a poster image
 * for instant display while the video loads.
 * 
 * Usage:
 * 1. Install ffmpeg if not already installed:
 *    - macOS: brew install ffmpeg
 *    - Ubuntu/Debian: sudo apt install ffmpeg
 *    - Windows: Download from https://ffmpeg.org/download.html
 * 
 * 2. Run this script:
 *    node scripts/extract-video-poster.js
 * 
 * This will extract the first frame from /public/assets/02.mp4
 * and save it as /public/assets/02-poster.jpg
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const videoFile = path.join(__dirname, '../public/assets/02.mp4');
const posterFile = path.join(__dirname, '../public/assets/02-poster.jpg');

// Check if video file exists
if (!fs.existsSync(videoFile)) {
  console.error(`❌ Video file not found: ${videoFile}`);
  process.exit(1);
}

console.log('🎬 Extracting poster frame from video...');
console.log(`   Input: ${videoFile}`);
console.log(`   Output: ${posterFile}`);

// FFmpeg command to extract first frame
// -i: input file
// -ss 0: seek to 0 seconds (first frame)
// -vframes 1: extract only 1 frame
// -q:v 2: quality (2 is high quality, range 2-31)
const command = `ffmpeg -i "${videoFile}" -ss 0 -vframes 1 -q:v 2 "${posterFile}" -y`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error extracting poster frame:');
    console.error(error.message);
    console.error('\n💡 Make sure ffmpeg is installed:');
    console.error('   macOS: brew install ffmpeg');
    console.error('   Ubuntu/Debian: sudo apt install ffmpeg');
    console.error('   Windows: Download from https://ffmpeg.org/download.html');
    process.exit(1);
  }

  if (fs.existsSync(posterFile)) {
    console.log('✅ Poster frame extracted successfully!');
    console.log(`   Saved to: ${posterFile}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Optimize the poster image (compress if needed)');
    console.log('   2. Update Hero component to use poster="/assets/02-poster.jpg"');
  } else {
    console.error('❌ Poster file was not created');
    process.exit(1);
  }
});
