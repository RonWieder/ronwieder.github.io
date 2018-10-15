document.addEventListener('DOMContentLoaded', function() {
  M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
    enterDelay: 400,
    exitDelay: 150,
    margin: 3,
    inDuration: 500
  });
  M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
  M.Tabs.init(document.querySelector('.tabs'), {});
  M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});
});

fetch('https://api.github.com/users/RonWieder/repos')
  .then(response => response.json())
  .then(data => {
    const linksToProjects = data
      .filter(repo => !repo.name.includes('github.io'))
      .reduce(
        (acc, repo) =>
          (acc += `<li><a
            href=${repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            onclick='alertClick()'>
            ${repo.name}
          </a>
        </li>`),
        ''
      );
    document.querySelector('.projects-links').innerHTML = linksToProjects;
  });

alertClick = () => {
  alert('You will now be redirected to an external site on a new tab');
};

var tab_view = false;

activateTabs = _e => {
  if (!tab_view) {
    document.querySelector('.scale-transition').classList.add('scale-in');
    document.querySelector('.scale-transition').addEventListener(
      'transitionend',
      () => {
        document.querySelector(_e.getAttribute('dir')).click();
        tab_view = true;
      },
      { once: true }
    );
  } else {
    document.querySelector(_e.getAttribute('dir')).click();
  }
};

closeTabs = () => {
  document.querySelector('.scale-transition').classList.remove('scale-in');
  tab_view = false;
};

new ClipboardJS('.email');
