# Bohmian Particle in a Box

WebGL2 Bohmian mechanics simulation of a Gaussian wave packet in a hard-wall box. The packet starts moving to the right and reflects from the box boundaries.

- `Schrodinger`: `v = j / rho`
- `Pauli spin-1/2 (+z)`: `v = j / rho + (hbar / (2 m rho)) * (d_y rho, -d_x rho)`
- `Pauli spin-1/2 (-z)`: `v = j / rho - (hbar / (2 m rho)) * (d_y rho, -d_x rho)`

The wave field is advanced with a scalar Schrodinger stepper using hard-wall edge sampling. In the Pauli modes this corresponds to a factorized spinor with fixed spin along `+z` or `-z` and no magnetic field, so only the trajectory law changes. The absorbing boundary layer has been removed.

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
