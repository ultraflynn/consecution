Feature: Trigger hook at end of an era

  Scenario: Hook is executed when era ends without interruption and no actions
    Given an epoch is added at "1000"
    And the era is started with a completion hook
    And we wait "200" after the last epoch
    Then the completion hook should be executed at "1000"

  Scenario: Hook is executed when era ends without interruption and actions are fired
    Given an epoch is added at "1000"
    And the era is started
    When an action named "action" occurs after "500"
    And we wait "200" after the last epoch
    Then the action named "action" should be executed at "1000"
    And the completion hook should be executed at "1000"

  Scenario: Hook is executed when era with multiple epochs and the era ends without interruption
    Given an epoch is added at "1000"
    And an epoch is added at "2000"
    And the era is started
    When an action named "first-action" occurs after "500"
    When an action named "second-action" occurs after "1000"
    And we wait "200" after the last epoch
    Then the action named "first-action" should be executed at "1000"
    And the action named "second-action" should be executed at "2000"
    And the completion hook should be executed at "2000"

  Scenario: Hook is executed when era ends due to interruption
    Given an epoch is added at "1000"
    And an interruptible epoch is added at "2000"
    And the era is started
    When an action named "first-action" occurs after "500"
    When an action named "second-action" occurs after "1000"
    And we wait "200" after the last epoch
    Then the action named "first-action" should be executed at "1000"
    Then the action named "second-action" should be executed at "1500"
    And the completion hook should be executed at "1500"
