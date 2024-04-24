// Модуль работы с табами.
function tabs() {
  const tabs = document.querySelectorAll("[data-tabs]");
  let tabsActiveHash = [];

  tabs.forEach((tabsBlock, index) => {
    tabsBlock.classList.add("--tab-init");
    tabsBlock.setAttribute("data-tabs-index", index);
    tabsBlock.addEventListener("click", setTabsAction);
    initTabs(tabsBlock);
  });

  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
    let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        "[data-tabs-titles]>.--tab-active"
      );
      tabsActiveTitle
        ? tabsActiveTitle.classList.remove("--tab-active")
        : null;
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest("[data-tabs]") === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest("[data-tabs]") === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute("data-tabs-title", "");
        tabsContentItem.setAttribute("data-tabs-item", "");

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add("--tab-active");
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains(
          "--tab-active"
        );
      });
    }
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
    let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");

    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute("data-tabs-animate")) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500;
      }
    }

    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest("[data-tabs]") === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest("[data-tabs]") === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains("--tab-active")) {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = false;
          }
        } else {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest("[data-tabs-title]")) {
      const tabTitle = el.closest("[data-tabs-title]");
      const tabsBlock = tabTitle.closest("[data-tabs]");
      if (
        !tabTitle.classList.contains("--tab-active") &&
        !tabsBlock.querySelector("._slide")
      ) {
        let tabActiveTitle = tabsBlock.querySelectorAll(
          "[data-tabs-title].--tab-active"
        );
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
            (item) => item.closest("[data-tabs]") === tabsBlock
          ))
          : null;
        tabActiveTitle.length
          ? tabActiveTitle[0].classList.remove("--tab-active")
          : null;
        tabTitle.classList.add("--tab-active");
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}

tabs();