/**
 * BLAZEBYTE STUDIO — ACCESSIBLE CUSTOM SELECT / COMBOBOX ENGINE
 * Replaces native OS <select> popups with fully styled, keyboard-accessible dark theme dropdowns.
 * Conforms to WAI-ARIA 1.2 Combobox pattern with listbox popup.
 * Synchronizes 100% with the underlying native HTML <select> for form submission, FormData, and validation.
 */

(function() {
  'use strict';

  class CustomSelect {
    constructor(selectElement) {
      this.select = selectElement;
      if (!this.select || this.select.dataset.customSelectInitialized === 'true') {
        return;
      }

      this.select.dataset.customSelectInitialized = 'true';
      this.form = this.select.closest('form');
      this.formGroup = this.select.closest('.form-group');
      this.label = this.findLabel();
      this.isOpen = false;
      this.focusedIndex = -1;
      this.typeaheadQuery = '';
      this.typeaheadTimeout = null;

      this.render();
      this.bindEvents();
      this.syncFromNative();
    }

    findLabel() {
      if (this.select.id) {
        const label = document.querySelector(`label[for="${this.select.id}"]`);
        if (label) return label;
      }
      if (this.formGroup) {
        return this.formGroup.querySelector('label');
      }
      return null;
    }

    render() {
      const selectId = this.select.id || `select-${Math.random().toString(36).substr(2, 9)}`;
      const labelId = this.label ? (this.label.id || `${selectId}-label`) : `${selectId}-label`;
      if (this.label && !this.label.id) {
        this.label.id = labelId;
      }

      // 1. Create Wrapper
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'custom-select-wrapper';
      this.wrapper.dataset.selectId = selectId;

      // 2. Create Trigger Button (Combobox)
      this.trigger = document.createElement('button');
      this.trigger.type = 'button';
      this.trigger.className = 'custom-select-trigger';
      this.trigger.id = `${selectId}-trigger`;
      this.trigger.setAttribute('role', 'combobox');
      this.trigger.setAttribute('aria-haspopup', 'listbox');
      this.trigger.setAttribute('aria-expanded', 'false');
      this.trigger.setAttribute('aria-controls', `${selectId}-menu`);
      if (this.label) {
        this.trigger.setAttribute('aria-labelledby', `${labelId} ${selectId}-trigger`);
      }

      this.valueSpan = document.createElement('span');
      this.valueSpan.className = 'custom-select-value';
      this.valueSpan.textContent = this.getSelectedText();

      this.arrowSpan = document.createElement('span');
      this.arrowSpan.className = 'custom-select-arrow';
      this.arrowSpan.setAttribute('aria-hidden', 'true');
      this.arrowSpan.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;

      this.trigger.appendChild(this.valueSpan);
      this.trigger.appendChild(this.arrowSpan);

      // 3. Create Dropdown Menu (Listbox)
      this.menu = document.createElement('div');
      this.menu.className = 'custom-select-menu';
      this.menu.id = `${selectId}-menu`;
      this.menu.setAttribute('role', 'listbox');
      if (this.label) {
        this.menu.setAttribute('aria-labelledby', labelId);
      }
      this.menu.setAttribute('tabindex', '-1');

      this.optionsContainer = document.createElement('div');
      this.optionsContainer.className = 'custom-select-options';

      this.optionElements = [];
      Array.from(this.select.options).forEach((opt, idx) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-select-option';
        optionEl.setAttribute('role', 'option');
        optionEl.id = `${selectId}-opt-${idx}`;
        optionEl.dataset.value = opt.value;
        optionEl.dataset.index = idx;
        optionEl.setAttribute('aria-selected', opt.selected ? 'true' : 'false');
        if (opt.selected) {
          optionEl.classList.add('selected');
        }

        const labelSpan = document.createElement('span');
        labelSpan.className = 'option-label';
        labelSpan.textContent = opt.textContent;

        const checkSpan = document.createElement('span');
        checkSpan.className = 'option-check';
        checkSpan.setAttribute('aria-hidden', 'true');
        checkSpan.textContent = '✓';

        optionEl.appendChild(labelSpan);
        optionEl.appendChild(checkSpan);

        this.optionsContainer.appendChild(optionEl);
        this.optionElements.push(optionEl);
      });

      this.menu.appendChild(this.optionsContainer);

      // 4. Mount Custom Elements into DOM
      this.select.parentNode.insertBefore(this.wrapper, this.select);
      this.wrapper.appendChild(this.select);
      this.wrapper.appendChild(this.trigger);
      this.wrapper.appendChild(this.menu);

      // 5. Visually hide native select while preserving form capability
      this.select.classList.add('visually-hidden-select');
      this.select.setAttribute('tabindex', '-1');
      this.select.setAttribute('aria-hidden', 'true');

      if (this.formGroup) {
        this.formGroup.classList.add('has-custom-select');
      }
    }

    getSelectedText() {
      const selectedOption = this.select.options[this.select.selectedIndex];
      return selectedOption ? selectedOption.textContent : '';
    }

    bindEvents() {
      // Toggle on trigger click
      this.trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      });

      // Keyboard navigation on trigger button
      this.trigger.addEventListener('keydown', (e) => this.handleKeydown(e));

      // Option interactions
      this.optionElements.forEach((optEl, idx) => {
        // Pointer click to select
        optEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.selectOption(idx);
        });

        // Hover simply highlights visually WITHOUT altering selected value
        optEl.addEventListener('mouseenter', () => {
          this.setFocusedIndex(idx, false);
        });
      });

      // Synchronize when underlying select value changes externally
      this.select.addEventListener('change', () => {
        this.syncFromNative();
      });

      // Handle native HTML5 form validation invalid event
      this.select.addEventListener('invalid', () => {
        this.trigger.classList.add('has-error');
      });

      // If within a form, clear error on reset
      if (this.form) {
        this.form.addEventListener('reset', () => {
          setTimeout(() => this.syncFromNative(), 10);
        });
      }

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!this.wrapper.contains(e.target) && this.isOpen) {
          this.close();
        }
      });

      // Close on window resize / orientation change
      window.addEventListener('resize', () => {
        if (this.isOpen) {
          this.checkPlacement();
        }
      }, { passive: true });
    }

    handleKeydown(e) {
      if (this.select.disabled) return;

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (!this.isOpen) {
            this.open();
          } else {
            if (this.focusedIndex >= 0 && this.focusedIndex < this.optionElements.length) {
              this.selectOption(this.focusedIndex);
            } else {
              this.close();
            }
          }
          break;

        case 'ArrowDown':
          e.preventDefault();
          if (!this.isOpen) {
            this.open();
          } else {
            const nextIdx = this.focusedIndex < this.optionElements.length - 1 ? this.focusedIndex + 1 : 0;
            this.setFocusedIndex(nextIdx, true);
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (!this.isOpen) {
            this.open();
          } else {
            const prevIdx = this.focusedIndex > 0 ? this.focusedIndex - 1 : this.optionElements.length - 1;
            this.setFocusedIndex(prevIdx, true);
          }
          break;

        case 'Home':
          if (this.isOpen) {
            e.preventDefault();
            this.setFocusedIndex(0, true);
          }
          break;

        case 'End':
          if (this.isOpen) {
            e.preventDefault();
            this.setFocusedIndex(this.optionElements.length - 1, true);
          }
          break;

        case 'Escape':
          if (this.isOpen) {
            e.preventDefault();
            this.close();
            this.trigger.focus();
          }
          break;

        case 'Tab':
          if (this.isOpen) {
            this.close();
          }
          break;

        default:
          // Typeahead search
          if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            this.handleTypeahead(e.key);
          }
          break;
      }
    }

    handleTypeahead(char) {
      clearTimeout(this.typeaheadTimeout);
      this.typeaheadQuery += char.toLowerCase();

      this.typeaheadTimeout = setTimeout(() => {
        this.typeaheadQuery = '';
      }, 500);

      const matchIdx = Array.from(this.select.options).findIndex(opt =>
        opt.textContent.trim().toLowerCase().startsWith(this.typeaheadQuery)
      );

      if (matchIdx !== -1) {
        if (!this.isOpen) {
          this.open();
        }
        this.setFocusedIndex(matchIdx, true);
      }
    }

    open() {
      // Close any other open dropdowns first
      CustomSelect.closeAll(this);

      this.isOpen = true;
      this.checkPlacement();
      this.wrapper.classList.add('open');
      if (this.formGroup) {
        this.formGroup.classList.add('custom-select-open');
      }
      this.trigger.setAttribute('aria-expanded', 'true');

      // Focus currently selected option
      const selectedIdx = this.select.selectedIndex >= 0 ? this.select.selectedIndex : 0;
      this.setFocusedIndex(selectedIdx, true);
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.wrapper.classList.remove('open', 'open-up');
      if (this.formGroup) {
        this.formGroup.classList.remove('custom-select-open');
      }
      this.trigger.setAttribute('aria-expanded', 'false');
      this.clearOptionFocus();
    }

    checkPlacement() {
      const rect = this.trigger.getBoundingClientRect();
      const menuHeight = 290;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        this.wrapper.classList.add('open-up');
      } else {
        this.wrapper.classList.remove('open-up');
      }
    }

    setFocusedIndex(index, scrollIntoView = false) {
      this.clearOptionFocus();
      if (index >= 0 && index < this.optionElements.length) {
        this.focusedIndex = index;
        const optEl = this.optionElements[index];
        optEl.classList.add('is-focused');
        this.trigger.setAttribute('aria-activedescendant', optEl.id);

        if (scrollIntoView) {
          optEl.scrollIntoView({ block: 'nearest' });
        }
      }
    }

    clearOptionFocus() {
      this.optionElements.forEach(el => el.classList.remove('is-focused'));
      this.trigger.removeAttribute('aria-activedescendant');
      this.focusedIndex = -1;
    }

    selectOption(index) {
      if (index < 0 || index >= this.select.options.length) return;

      const opt = this.select.options[index];
      this.select.selectedIndex = index;
      this.select.value = opt.value;

      // Dispatch standard DOM events for forms and third-party scripts
      this.select.dispatchEvent(new Event('change', { bubbles: true }));
      this.select.dispatchEvent(new Event('input', { bubbles: true }));

      this.syncFromNative();
      this.close();
      this.trigger.focus();
    }

    syncFromNative() {
      const currentIdx = this.select.selectedIndex;
      const currentOption = this.select.options[currentIdx];

      if (currentOption) {
        this.valueSpan.textContent = currentOption.textContent;
        this.trigger.classList.remove('has-error');
      } else {
        this.valueSpan.textContent = '';
      }

      this.optionElements.forEach((el, idx) => {
        const isSelected = (idx === currentIdx);
        el.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        if (isSelected) {
          el.classList.add('selected');
        } else {
          el.classList.remove('selected');
        }
      });
    }

    static closeAll(exceptInstance = null) {
      if (window._blazeByteCustomSelectInstances) {
        window._blazeByteCustomSelectInstances.forEach(inst => {
          if (inst !== exceptInstance && inst.isOpen) {
            inst.close();
          }
        });
      }
    }

    static initAll(root = document) {
      if (!window._blazeByteCustomSelectInstances) {
        window._blazeByteCustomSelectInstances = [];
      }
      const selects = root.querySelectorAll('select:not([data-custom-select-initialized="true"])');
      selects.forEach(select => {
        const inst = new CustomSelect(select);
        window._blazeByteCustomSelectInstances.push(inst);
      });
    }
  }

  // Global exposure
  window.CustomSelect = CustomSelect;
  window.initCustomSelects = CustomSelect.initAll;

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CustomSelect.initAll());
  } else {
    CustomSelect.initAll();
  }
})();
