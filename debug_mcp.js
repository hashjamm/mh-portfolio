const { spawn } = require('child_process');
const path = require('path');

// Configuration from mcp_config.json
// Configuration attempting to fix EINVAL
const command = "cmd.exe";
const args = [
    "/c",
    "C:\\Users\\HashJam\\.pyenv\\pyenv-win\\shims\\uvx.bat",
    "--quiet",
    "--python",
    "3.12",
    "mcp-server-office"
];

console.log(`Spawning: ${command} ${args.join(' ')}`);

const child = spawn(command, args, {
    shell: false, // Trying without shell first, as MCP clients likely do
    env: process.env
});

child.stdout.on('data', (data) => {
    console.log(`STDOUT: ${data.toString()}`);
});

child.stderr.on('data', (data) => {
    console.log(`STDERR: ${data.toString()}`);
});

child.on('error', (err) => {
    console.error(`Failed to start subprocess: ${err}`);
});

child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
});

// Keep alive for a bit
setTimeout(() => {
    console.log('Timeout reached, killing process');
    child.kill();
}, 10000);
