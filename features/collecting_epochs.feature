Feature: Collect actions at the next epoch and then execute together

  Scenario: Add single epoch into era and collect single action
    Given an epoch is added at "1000"
    And the era is started
    When an action named "action" occurs after "500"
    And we wait "200" after the last epoch
    Then the action named "action" should be executed at "1000"

  Scenario: Add single epoch into era and collect multiple actions
    Given an epoch is added at "1000"
    And the era is started
    When an action named "first-action" occurs after "300"
    And an action named "second-action" occurs after "300"
    And we wait "200" after the last epoch
    Then the action named "first-action" should be executed at "1000"
    And the action named "second-action" should be executed at "1000"

  Scenario: Add multiple epochs into era and collect single action during first period
    Given an epoch is added at "1000"
    And an epoch is added at "2000"
    And the era is started
    When an action named "action" occurs after "500"
    And we wait "200" after the last epoch
    Then the action named "action" should be executed at "1000"

  Scenario: Add multiple epochs into era and collect multiple actions during first period
    Given an epoch is added at "1000"
    And an epoch is added at "2000"
    And the era is started
    When an action named "first-action" occurs after "300"
    When an action named "second-action" occurs after "300"
    And we wait "200" after the last epoch
    Then the action named "first-action" should be executed at "1000"
    And the action named "second-action" should be executed at "1000"

  Scenario: Add multiple epochs into era and collect single action during second period
    Given an epoch is added at "1000"
    And an epoch is added at "2000"
    And the era is started
    When an action named "action" occurs after "1500"
    And we wait "200" after the last epoch
    Then the action named "action" should be executed at "2000"

  Scenario: Add multiple epochs into era and collect multiple actions during second period
    Given an epoch is added at "1000"
    And an epoch is added at "2000"
    And the era is started
    When an action named "first-action" occurs after "1300"
    When an action named "second-action" occurs after "300"
    And we wait "200" after the last epoch
    Then the action named "first-action" should be executed at "2000"
    And the action named "second-action" should be executed at "2000"

  Scenario: Add multiple epochs into era and collect single action during both
    Given an epoch is added at "1000"
    And an epoch is added at "2000"
    And the era is started
    When an action named "first-action" occurs after "500"
    When an action named "second-action" occurs after "1000"
    And we wait "200" after the last epoch
    Then the action named "first-action" should be executed at "1000"
    And the action named "second-action" should be executed at "2000"

  Scenario: Add multiple epochs into era and collect multiple actions during both
    Given an epoch is added at "1000"
    And an epoch is added at "2000"
    And the era is started
    When an action named "first-action" occurs after "300"
    When an action named "second-action" occurs after "300"
    When an action named "third-action" occurs after "1000"
    When an action named "fourth-action" occurs after "300"
    And we wait "200" after the last epoch
    Then the action named "first-action" should be executed at "1000"
    And the action named "second-action" should be executed at "1000"
    And the action named "third-action" should be executed at "2000"
    And the action named "fourth-action" should be executed at "2000"


