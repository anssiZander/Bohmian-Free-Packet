# Bohmian Free Packet

WebGL2 Bohmian mechanics simulation of a free particle Gaussian wave packet moving to the right, with boundary absorption/freeze zones retained.

- `Schrodinger`: `v = j / rho`
- `Pauli spin-1/2 (+z)`: `v = j / rho + (hbar / (2 m rho)) * (d_y rho, -d_x rho)`
- `Pauli spin-1/2 (-z)`: `v = j / rho - (hbar / (2 m rho)) * (d_y rho, -d_x rho)`

The wave field is advanced with the same scalar free-particle Schrodinger stepper. In the Pauli modes this corresponds to a factorized spinor with fixed spin along `+z` or `-z` and no magnetic field, so only the trajectory law changes.

## Run

Serve the repository root with any static file server and open `index.html`.

```powershell
py -m http.server
```

Then open `http://localhost:8000/`.

## Controls

- `physics mode` switches between the three trajectory laws and resets the run.
- `Reset` restarts the wave, particles, and trails.
- `Pause` stops time stepping.
- `R` resets the simulation.
