'use strict';
const branches = {
  follow: { label: 'TIMELINE A / THE UNKNOWN', title: 'Somewhere, someone answers.', description: 'You leave the familiar valley and follow the signal beyond the ridge. A doorway appears where the map ends. The story becomes a journey into the unknown.' },
  stay: { label: 'TIMELINE B / THE FAMILIAR, CHANGED', title: 'The world was speaking all along.', description: 'You stay in the valley and listen. As night falls, the lights of the habitat begin to answer one another. The signal was never a destination. The story becomes a discovery of home.' }
};
document.querySelectorAll('[data-branch]').forEach(button => {
  button.addEventListener('click', () => {
    const choice = button.dataset.branch;
    const story = branches[choice];
    document.querySelectorAll('[data-branch]').forEach(other => {
      const active = other === button;
      other.setAttribute('aria-pressed', String(active));
      other.classList.toggle('active', active);
    });
    document.querySelector('.path-follow').classList.toggle('active', choice === 'follow');
    document.querySelector('.path-stay').classList.toggle('active', choice === 'stay');
    document.getElementById('branch-label').textContent = story.label;
    document.getElementById('branch-title').textContent = story.title;
    document.getElementById('branch-description').textContent = story.description;
    document.getElementById('story-visual').dataset.scene = choice;
  });
});
