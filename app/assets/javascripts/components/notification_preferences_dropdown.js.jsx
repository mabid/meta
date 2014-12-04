/** @jsx React.DOM */

var CONSTANTS = window.CONSTANTS;
// var Dispatcher = require('../dispatcher');
var NotificationPreferencesDropdownStore = require('../stores/notification_preferences_dropdown_store');
var Avatar = require('./avatar.js.jsx');

(function() {
  var D = CONSTANTS.NOTIFICATION_PREFERENCES_DROPDOWN;

  var NotificationPreferencesDropdown = React.createClass({

    componentWillMount: function() {
      NotificationPreferencesDropdownStore.addChangeListener(this.handleUpdate);
    },

    getInitialState: function() {
      return {
        productWatchersCount: this.props.productWatchersCount,
        selected: this.props.watchingState,
        chevron: false
      };
    },

    render: function() {
      var buttonLabel = null;

      switch (this.state.selected) {
      case 'following':
        buttonLabel = 'Following';
        break;
      case 'announcements':
        buttonLabel = 'Following';
        break;
      case 'not watching':
        buttonLabel = 'Follow';
        break;
      }

      return (
        <div className="dropdown">
          <button className={this.togglerClasses()} type="button" data-toggle="dropdown">
            <div className="toggler-label">{buttonLabel}</div>

            <div className="toggler-badge">
              {this.state.productWatchersCount}
            </div>
          </button>

          <ul
              className="dropdown-menu dropdown-menu-right"
              role="menu">
            <li
                role="presentation"
                className="dropdown-header"
                style={{ color: '#a6a6a6', backgroundColor: '#f3f3f3' }}>
              <strong>Following Preferences</strong>
            </li>

            <li role="presentation" style={{ cursor: 'pointer' }} className={this.selectedClass('not watching')}>
              <a role="menuitem" tabIndex="-1" onClick={this.updatePreference.bind(this, 'not watching', this.props.productUnfollowPath)}>
                <div>
                  <strong>Not following</strong>
                </div>
                <span className="text-muted hidden-xs">
                  Receive notifications when you are @mentioned
                </span>
              </a>
            </li>

            <li role="presentation" style={{ cursor: 'pointer' }} className={this.selectedClass('announcements')}>
              <a role="menuitem" tabIndex="-1" onClick={this.updatePreference.bind(this, 'announcements', this.props.productAnnouncementsPath)}>
                <div>
                  <strong>Updates only</strong>
                </div>
                <div className="text-muted hidden-xs">
                  Receive notifications when there are new updates
                </div>
              </a>
            </li>

            <li role="presentation" style={{ cursor: 'pointer' }} className={this.selectedClass('following')}>
              <a role="menuitem" tabIndex="-1" onClick={this.updatePreference.bind(this, 'following', this.props.productFollowPath)}>
                <div>
                  <strong>Following</strong>
                </div>
                <div className="text-muted hidden-xs">
                  Receive notifications when there are new updates, discussions, and chat messages
                </div>
              </a>
            </li>
          </ul>
        </div>
      );
    },

    showChevron: function() {
      this.setState({
        chevron: true
      });
    },

    handleUpdate: function() {
      this.setState({
        selected: NotificationPreferencesDropdownStore.getSelected()
      });
    },

    togglerClasses: function() {
      return React.addons.classSet({
        'dropdown-toggle': true,
        'toggler': true,
        'block': true,
        'full-width': true,
        'toggler-primary': (this.state.selected === 'not watching')
      })
    },

    selectedClass: function(option) {
      if (this.state.selected === option) {
        return "active";
      }
    },

    updatePreference: function(preference, path) {
      var action = D.ACTIONS.UPDATE_SELECTED;

      Dispatcher.dispatch({
        action: action,
        data: {
          preference: preference,
          path: path
        }
      });
    }
  });

  if (typeof module !== 'undefined') {
    module.exports = NotificationPreferencesDropdown;
  }

  window.NotificationPreferencesDropdown = NotificationPreferencesDropdown;
})();