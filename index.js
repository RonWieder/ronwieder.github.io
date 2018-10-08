// 'use strict';
// import copy from 'copy-to-clipboard';
// $('.link-icon').on(
//   'click mousedown mouseup focus blur keydown change mouseover mouseleave',
//   function(e) {
//     console.log(e);
//   }
// );

// document.querySelectorAll('.link-icon').forEach(link => {
//   link.addEventListener(
//     'click mousedown mouseup focus blur keydown change mouseover hover',
//     e => {
//       console.log(e);
//       //   $('.tooltipped').tooltip('close');
//     }
//   );
// });
let instance;
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems, {
    enterDelay: 400,
    exitDelay: 150,
    margin: 3,
    inDuration: 500
  });
  const tabElem = document.querySelector('.tabs');
  instance = M.Tabs.init(tabElem, {
    onShow() {
      instance.updateTabIndicator();
    }
  });
});

function copyEmail(el) {
  console.log(el.innerHTML);
  copy(el.innerHTML);
}

fetch('https://api.github.com/users/RonWieder/repos')
  .then(response => response.json())
  .then(data => {
    const linksToProjects = data
      .filter(repo => !repo.name.includes('github.io'))
      .map(repo => {
        return `<li><a
            href=${repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            onclick='alertClick()'>
            ${repo.name}
          </a>
        </li>`;
      })
      .join('')
      .replace(/ /g, '');
    document.querySelector('.projects-links').innerHTML = linksToProjects;
  });

$(document).ready(() => {
  $('.collapsible').collapsible();
  $('.materialboxed').materialbox();
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
        console.log('Hi');
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
