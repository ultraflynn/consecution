Feature: Interrupt a period and execute action

  Scenario: Add single epoch into era and interrupt it
    Given an interruptable epoch is added at "1000"
    And the era is started
    When an action named "action" occurs after "500"
    And we wait "200" after the last epoch
    Then the action named "action" should be executed at "500"

  Scenario: Add multiple epochs into era and interrupt first period
    Given an interruptable epoch is added at "1000"
    And an epoch is added at "2000"
    And the era is started
    When an action named "action" occurs after "500"
    And we wait "200" after the last epoch
    Then the action named "action" should be executed at "500"

  Scenario: Add multiple epochs into era and interrupt last period
    Given an epoch is added at "1000"
    And an interruptable epoch is added at "2000"
    And the era is started
    When an action named "action" occurs after "1500"
    And we wait "200" after the last epoch
    Then the action named "action" should be executed at "1500"
