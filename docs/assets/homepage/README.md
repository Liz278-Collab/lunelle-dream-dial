# LUNELLE Homepage Asset Pack

Source artwork: 1060 × 1484px.

## Recommended implementation
For the closest possible match to the approved visual, use `homepage-master.jpg`
as the entire visible homepage artwork and place transparent HTML buttons/hotspots
over the interactive regions using percentages from `hotspots.json`.

This avoids Codex redrawing the phone, palm trees, stickers, typography, and decorative
elements in CSS, which would change the approved art direction.

## Files
- homepage-master.jpg — approved homepage visual, use this as the main visual layer
- hotspots.json — normalized interaction coordinates
- phone-main.jpg — phone reference crop
- desktop-icons.jpg — desktop icon reference crop
- brand-logo.jpg — logo crop
- sticky-call.jpg / sticky-surprise.jpg — sticky note crops
- answer-button.jpg / ignore-button.jpg — button crops
- taskbar.jpg — taskbar crop

## Important
The supplied source is a single flattened JPEG, so individual objects cannot be
cleanly extracted as true transparent PNG layers without reconstructing/inpainting
the hidden background. These crops are reference/reuse assets, not alpha-isolated layers.
