---
canonical: https://grafana.com/docs/grafana/latest/whatsnew/whats-new-next/
description: Feature and improvement highlights for Grafana Cloud
keywords:
  - grafana
  - new
  - documentation
  - cloud
  - release notes
labels:
  products:
    - cloud
title: What's new in Grafana Cloud
weight: -37
---

# What’s new in Grafana Cloud

Welcome to Grafana Cloud! Read on to learn about the newest changes to Grafana Cloud.

## Export alerting resources to Terraform

<!-- Yuri Tseretyan -->
<!-- OSS, Enterprise -->

October 30, 2023

_Generally available in Grafana Cloud_

Export your alerting resources, such as alert rules, contact points, and notification policies as Terraform resources. A new “Modify export” mode for alert rules enables you to edit provisioned alert rules and export a modified version.

## Alerting insights

<!-- George Robinson -->

October 30, 2023

_Generally available in Grafana Cloud_

Use Alerting insights to monitor your alerting data, discover key trends about your organization’s alert management performance, and find patterns in why things go wrong.

## Configure refresh token handling separately for OAuth providers

<!-- Mihaly Gyongyosi -->
<!-- already in on-prem -->

October 24, 2023

_Generally available in Grafana Cloud_

With Grafana v9.3, we introduced a feature toggle called `accessTokenExpirationCheck`. It improves the security of Grafana by checking the expiration of the access token and automatically refreshing the expired access token when a user is logged in using one of the OAuth providers.

With the current release, we've introduced a new configuration option for each OAuth provider called `use_refresh_token` that allows you to configure whether the particular OAuth integration should use refresh tokens to automatically refresh access tokens when they expire. In addition, to further improve security and provide secure defaults, `use_refresh_token` is enabled by default for providers that support either refreshing tokens automatically or client-controlled fetching of refresh tokens. It's enabled by default for the following OAuth providers: `AzureAD`, `GitLab`, `Google`.

For more information on how to set up refresh token handling, please refer to [the documentation of the particular OAuth provider.](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/setup-grafana/configure-security/configure-authentication/).

{{% admonition type="note" %}}
The `use_refresh_token` configuration must be used in conjunction with the `accessTokenExpirationCheck` feature toggle. If you disable the `accessTokenExpirationCheck` feature toggle, Grafana won't check the expiration of the access token and won't automatically refresh the expired access token, even if the `use_refresh_token` configuration is set to `true`.

The `accessTokenExpirationCheck` feature toggle will be removed in Grafana v10.3.
{{% /admonition %}}

## Use AI to generate dashboard titles, descriptions, and change summaries

<!-- Nathan Marrs -->
<!-- OSS, Enterprise -->
<!-- already in on-prem release notes -->

October 24, 2023

_Available in public preview in Grafana Cloud_

You can now use generative AI to assist you in your Grafana dashboards. So far generative AI can help you with the following tasks:

- **Generate panel and dashboard titles and descriptions** - You can now generate a title and description for your panel or dashboard based on the data you've added to it. This is useful when you want to quickly visualize your data and don't want to spend time coming up with a title or description.
- **Generate dashboard save changes summary** - You can now generate a summary of the changes you've made to a dashboard when you save it. This is great for effortlessly tracking the history of a dashboard.

To enable these features, you must first enable the `dashgpt` [feature toggle](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/setup-grafana/configure-grafana/feature-toggles/#experimental-feature-toggles). Then install and configure Grafana's LLM app plugin. For more information, refer to the [Grafana LLM app plugin documentation](https://grafana.com/docs/grafana-cloud/alerting-and-irm/machine-learning/llm-plugin/).

When enabled, look for the **✨ Auto generate** option next to the **Title** and **Description** fields in your panels and dashboards, or when you press the **Save** button.

{{< figure src="/media/docs/grafana/dashboards/auto-generate-description-10-2.gif" max-width="750px" caption="Auto-generate a panel description using AI" >}}

## Create interactive buttons in canvas visualizations

<!-- Nathan Marrs -->
<!-- OSS, Enterprise -->
<!-- already in on-prem release notes -->

October 24, 2023

_Available in public preview in Grafana Cloud_

You can now add buttons to your canvas visualizations. Buttons can be configured to call an API endpoint. This pushes Grafana's capabilities to new heights, allowing you to create interactive dashboards that can be used to control external systems.

To learn more, refer to our [Canvas button element documentation](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/panels-visualizations/visualizations/canvas/#button).

{{< video-embed src="/media/docs/grafana/2023-20-10-Canvas-Button-Element-Enablement-Video.mp4" max-width="750px" caption="Canvas button element demo" >}}

## Zoom in on the y-axis of the time series and candlestick visualizations

<!-- Nathan Marrs -->
<!-- OSS, Enterprise -->
<!-- already in on-prem release notes -->

October 24, 2023

_Generally available in Grafana Cloud_

You can now zoom in on the y-axis of your time series and candlestick visualizations. This is useful when you want to focus on a specific range of values. To zoom in on the y-axis on supported visualizations, hold the Shift key while clicking and dragging; double-click to reset the zoom.

{{< video-embed src="/media/docs/grafana/screen-recording-10-2-y-axis-zoom-demo.mp4" max-width="750px" caption="Y-axis zooming demo" >}}

## Data visualization quality of life improvements

We've made a number of smaller improvements to the data visualization experience in Grafana.

<!-- Nathan Marrs -->
<!-- OSS, Enterprise -->
<!-- already in on-prem release notes -->

October 24, 2023

_Generally available in Grafana Cloud_

**Geomap marker symbol alignment options**

You can now offset geomap marker symbols from the underlying data point.

{{< figure src="/media/docs/grafana/gif-grafana-10-2-geomap-marker-symbol-alignment.gif" max-width="750px" caption="Geomap marker symbol alignment" >}}

**Gauge visualization overflow support**

You can now visualize gauges in vertical and horizontal orientations with overflow. This resolves an issue where the design would break when the number of gauges exceeded the available space.

{{< figure src="/media/docs/grafana/gif-grafana-10-2-gauge-overflow.gif" max-width="750px" caption="Gauge overflow" >}}

**Bar chart axes improvements**

You can now center bar chart axes on zero and configure axes border and color settings.

{{< figure src="/media/docs/grafana/screenshot-grafana-10-2-bar-chart-axes-improvements.png" max-width="750px" caption="Bar chart improvements" >}}

## Detect unusable transformations

<!-- Kyle Cunningham -->
<!-- OSS, Enterprise -->
<!-- already in on-prem release notes -->

October 24, 2023

_Available in public preview in Grafana Cloud_

We've added initial support to detect situations in which various transformations won't work appropriately based on current data. Previously, selecting the appropriate transformation and configuring it correctly required a process of trial and error or already knowing how a given transformation worked. Now, transformations that we've detected can't be used are shaded in the interface to indicate this, along with a helpful message explaining why.

{{< figure src="/media/docs/grafana/transformations/disabled-transformation.png" caption="Transformation that has been disabled because it doesn't have the necessary data" >}}

## Tempo data source: "Aggregate By" Search option to compute RED metrics over spans aggregated by attribute

<!-- Joey Tawadrous, Jen Villa -->
<!-- available in on-prem, both open source Grafana and Grafana Enterprise, starting with Grafana 10.2, but also requires Tempo or Grafana Enterprise Traces (GET) v2.2 or greater -->

October 24, 2023

_Experimental in Grafana Cloud_

We've added an **Aggregate By** option to the [TraceQL query editor](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/datasources/tempo/query-editor/traceql-search/#write-traceql-queries-using-search) to leverage Grafana Cloud Traces' [metrics summary API](https://grafana.com/docs/grafana-cloud/monitor-infrastructure/traces/metrics-summary-api/). You can calculate RED metrics (total span count, percent erroring spans, and latency information) for spans of `kind=server` received in the last hour that match your filter criteria, grouped by whatever attributes you specify.

This feature is disabled by default. To enable it, file contact Grafana Support.

For more information, refer to the [documentation](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/datasources/tempo/query-editor/traceql-search/#optional-use-aggregate-by).

{{< figure src="/media/docs/tempo/metrics-summary-10-2.png" caption="Aggregate by" >}}

## Support for dashboard variables in transformations

<!-- Oscar Kilhed, Victor Marin -->
<!-- already in on-prem -->

October 24, 2023

_Experimental in Grafana Cloud_

Previously, the only transformation that supported [dashboard variables](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/dashboards/variables/) was the **Add field from calculation** transformation. We've now extended the support for variables to the **Filter by value**, **Create heatmap**, **Histogram**, **Sort by**, **Limit**, **Filter by name**, and **Join by field** transformations.

We've also made it easier to find the correct dashboard variable by displaying available variables in the fields that support them, either in the drop-down or as a suggestion when you type **$** or press Ctrl + Space:

{{< figure src="/media/docs/grafana/transformations/completion.png" caption="Input with dashboard variable suggestions" >}}

## Role mapping support for Google OIDC

<!-- Jo Guerreiro -->
<!-- already in on-prem -->

October 24, 2023

_Generally available in Grafana Cloud_

You can now map Google groups to Grafana organizational roles when using Google OIDC.
This is useful if you want to limit the access users have to your Grafana instance.

We've also added support for controlling allowed groups when using Google OIDC.

Refer to the [Google Authentication documentation](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/setup-grafana/configure-security/configure-authentication/google/) to learn how to use these new options.

## Multiple spansets per trace

<!-- Joey Tawadrous -->
<!-- OSS, Enterprise -->

October 24, 2023

_Generally available in Grafana Cloud_

The [TraceQL query editor](https://grafana.com/docs/tempo/<TEMPO_VERSION>/traceql/#traceql-query-editor) has been improved to facilitate the grouping of multiple spans per trace in TraceQL queries. For example, when the following `by(resource.service.name)` is added to your TraceQL query, it will group the spans in each trace by `resource.service.name`.

{{< figure src="/media/docs/tempo/multiple-spansets-per-trace-10-2.png" max-width="750px" caption="Multiple spansets per trace" >}}

## Temporary credentials in CloudWatch data source

<!-- Michael Mandrus, Ida Štambuk, Sarah Zinger  -->
<!-- Cloud -->

October 24, 2023

_Available in private preview in Grafana Cloud_

The Grafana Assume Role authentication provider lets Grafana Cloud users of the CloudWatch data source authenticate with AWS without having to create and maintain long term AWS Users. Using the new assume role authentication method, you no longer have to rotate access and secret keys in your CloudWatch data source. Instead, Grafana Cloud users can create an identity access and management (IAM) role that has a trust relationship with Grafana's AWS account; Grafana's AWS account will then use AWS Secure Token Service (STS) to create temporary credentials to access the user's AWS data.

To learn more, refer to the [CloudWatch authentication documentation](/docs/grafana/next/datasources/aws-cloudwatch/aws-authentication).

## Create alerts from panels

<!-- Brenda Muir -->
<!-- OSS, Enterprise from 10.3-->

October 23, 2023

_Generally available in Grafana Cloud_

Create alerts from dashboard panels. You can reuse the panel queries and create alerts based on them.

## No basic role

<!-- Eric Leijonmarck -->
<!-- OSS, Enterprise -->

October 12, 2023

_Generally available in Grafana Cloud_

We're excited to introduce the "No basic role," a new basic role with no permissions. A basic role in Grafana dictates the set of actions a user or entity can perform, known as permissions. This new role is especially beneficial if you're aiming for tailored, customized RBAC permissions for your service accounts or users. You can set this as a basic role through the API or UI.

Previously, permissions were granted based on predefined sets of capabilities. Now, with the "No basic role," you have the flexibility to be even more granular.

For more details on basic roles and permissions, refer to the [documentation](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/administration/roles-and-permissions/).

To assign the "No basic role" in your Grafana Cloud stack, contact Grafana Support and ask them to enable the `skip_org_role_sync` feature toggle. You'll be able to change basic roles that are synced using GCom.

## Content outline

<!-- Thanos Karachalios -->
<!-- OSS,Enterprise -->

October 12, 2023

_Generally Available in Grafana Cloud_

Introducing Content Outline in Grafana **Explore**. We recognized the challenges of complex mixed queries, as well as, lengthy logs and traces results, leading to time-consuming navigation and the loss of context. Content outline is our first step towards seamless navigation from log lines to traces and back to queries ensuring quicker searches while preserving context. Experience efficient, contextual investigations with this update in Grafana Explore. To learn more, refer to the [Content outline documentation](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/explore/#content-outline), as well as the following video demo.

{{< video-embed src="/media/docs/grafana/explore/content-outline-demo.mp4" >}}

## Public dashboards

<!-- Thanos Karachalios -->
<!-- Enterprise -->

October 12, 2023

_Generally Available in Grafana Cloud_

Public dashboards allow you to share your visualizations and insights to a broader audience without the requirement of a login. You can effortlessly use our current sharing model and create a public dashboard URL to share with anyone using the generated public URL link. To learn more, refer to the [Public dashboards documentation](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/dashboards/dashboard-public/), as well as the following video demo:

{{< video-embed src="/media/docs/grafana/dashboards/public-dashboards-demo.mp4" >}}

## Correlations editor in Explore

<!-- Kristina Durivage -->
<!-- OSS, Enterprise -->
<!-- already in on-prem -->

October 3, 2023

_Available in public preview in Grafana Cloud_

Creating correlations has just become easier. Try out our new correlations editor in **Explore** by selecting the **+ Add > Add correlation** option from the top bar or from the command palette. The editor shows all possible places where you can place data links and guides you through building and testing target queries. For more information, refer to [the documentation](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/administration/correlations/).

To enable this feature, contact Grafana Support.

## Improved TraceQL query editor

<!-- Fabrizio Casati -->
<!-- OSS, Enterprise -->

October 3, 2023

_Generally available in Grafana Cloud_

The [TraceQL query editor](https://grafana.com/docs/tempo/latest/traceql/#traceql-query-editor) has been improved to facilitate the creation of TraceQL queries. In particular, it now features improved autocompletion, syntax highlighting, and error reporting.

{{< video-embed src="/media/docs/tempo/screen-recording-grafana-10.2-traceql-query-editor-improvements.mp4" >}}

## Recorded queries: Record multiple metrics from a single query

<!-- Kyle Brandt, Observability Metrics -->
<!-- Enterprise -->

October 3, 2023

_Generally available in Grafana Cloud_

With recorded queries, a single recorded query can now record multiple metrics.

## Issues snapshot in Kubernetes Monitoring

<!-- Beverly Buchanan -->

September 29, 2023

_Generally available in Grafana Cloud_

To provide quicker identification and troubleshooting, the home page contains a snapshot of issues that reach the following thresholds:

- Pods that have been in a non-running state for more than 15 minutes
- Nodes with CPU usage above 90% for more than five minutes
- Nodes using more than 90% of memory for more than five minutes
- Persistent Volumes with capacity above 90%
- Node disks with capacity above 90%

(Release 1.3.1)
{{< figure max-width="80%" src="/media/docs/grafana-cloud/k8s/K8smon-snapshotview.png" caption="Home page snapshot view" >}}

## Tenant database instance name and number for SAP HANA® data source

<!-- Miguel Palau -->
<!-- OSS, Enterprise -->

September 25, 2023

_Generally available in Grafana Cloud_

The SAP HANA® data source now supports tenant databases connections by using the database name and/or instance number. For more information, refer to [SAP HANA® configuration](/docs/plugins/grafana-saphana-datasource/latest/#configuration).

{{< video-embed src="/media/docs/sap-hana/tenant.mp4" >}}

## Distributed tracing in Grafana Cloud k6

<!-- Heitor Tashiro Sergent -->

September 19, 2023

_Generally available in Grafana Cloud_

You can now use the Grafana Cloud Traces integration with Grafana Cloud k6 to quickly debug failed performance tests and proactively improve application reliability.

Distributed tracing in Grafana Cloud k6 only requires two things:

- An application instrumented for tracing with Grafana Cloud Traces.
- Adding a few lines of code to your existing k6 scripts.

The integration works by having k6 inject tracing metadata into the requests it sends to your backend services when you run a test. The tracing data is then correlated with k6 test run data, so you can understand how your services and operations behaved during the whole test run. The collected tracing data is aggregated to generate real-time metrics—such as frequency of calls, error rates, and percentile latencies—that can help you narrow your search space and quickly spot anomalies.

To learn more, refer to the [Integration with Grafana Cloud Traces documentation](/docs/grafana-cloud/k6/analyze-results/integration-with-grafana-cloud-traces/) and [Distributed Tracing in Grafana Cloud k6 blog post](https://grafana.com/blog/2023/09/19/troubleshoot-failed-performance-tests-faster-with-distributed-tracing-in-grafana-cloud-k6/).

## New browse dashboards

<!-- Yaelle Chaudy for Frontend Platform -->
<!-- OSS, Enterprise -->

September 19, 2023

_Generally available in Grafana Cloud_

The new browse dashboards interface features a more compact design, making it easier to navigate, search for, and manage for your folders and dashboards. The new interface also has many performance improvements, especially for instances with a large number of folders and dashboards.

To make using folders easier and more consistent, there is no longer a special **General** folder. Dashboards without a folder, or dashboards previously in **General**, are now shown at the root level.

To learn more, refer to the following video demo.

{{< video-embed src="/media/docs/grafana/2023-09-11-New-Browse-Dashboards-Enablement-Video.mp4" >}}

## Streamlined configuration of Kubernetes Monitoring

<!-- Beverly Buchanan -->

September 15, 2023

_Generally available in Grafana Cloud_

Configure with [Grafana Kubernetes Monitoring Helm chart](https://grafana.com/docs/grafana-cloud/monitor-infrastructure/kubernetes-monitoring/configuration/config-k8s-agent-flow) using a streamlined process. With this method, you can set on/off switches to gather metrics, logs, events, traces, and cost metrics. (Release 1.2.0)

{{< figure max-width="60%" src="/media/docs/grafana-cloud/k8s/k8smon-config-wizard.png" caption="Configuration wizard" >}}

## Tabs navigation in Kubernetes Monitoring

<!-- Beverly Buchanan -->

September 14, 2023

_Generally available in Grafana Cloud_

Quickly switch between the Cluster, namespace, workload, and Node views on the **Cluster Navigation** page using tabs. (Release 1.3.0)

{{< figure max-width="40%" src="/media/docs/grafana-cloud/k8s/k8smon-clusternav-tabs.png" caption="Tabs on **Cluster Navigation** page" >}}

## Data source menu on Cost and Efficiency views in Kubernetes Monitoring

<!-- Beverly Buchanan -->

September 14, 2023

_Generally available in Grafana Cloud_

You can change the data source you are viewing on the **Cost** and **Efficiency** views. (Release 1.2.1)

## Predict namespace memory usage in Kubernetes Monitoring

<!-- Beverly Buchanan -->

September 14, 2023

_Generally available in Grafana Cloud_

Click **Predict Memory usage** to predict namespace memory usage on the namespace detail page. (Release 1.2.1)

{{< figure max-width="50%" src="/media/docs/grafana-cloud/k8s/k8smon-predict-memusage-namespace.png" caption="**Predict Memory usage** button" >}}

## Traces collection with Kubernetes Monitoring

<!-- Beverly Buchanan -->

September 14, 2023

_Generally available in Grafana Cloud_

Collect traces when you configure Kubernetes Monitoring, and then use Tempo to create search queries. Refer to [Navigate to traces](/docs/grafana-cloud/monitor-infrastructure/kubernetes-monitoring/navigate-k8s-monitoring/#navigate-to-traces) for more information. (Release 1.3.0)

## Kafka integration in Kubernetes Monitoring

<!-- Beverly Buchanan -->

September 14, 2023

_Generally available in Grafana Cloud_

The Kafka integration is available for use in Kubernetes Monitoring. (Release 1.3.6)

## Create correlations for provisioned data sources

<!-- Piotr Jamróz -->
<!-- OSS, Enterprise -->
<!-- already in on-prem -->

September 13, 2023

_Available in public preview in Grafana Cloud_

You can now create correlations using either the **Administration** page or provisioning, regardless of whether a data source was provisioned or not. In previous versions of Grafana, if a data source was provisioned, the only way to add correlations to it was also with provisioning. Now, that's no longer the case, and you can easily create new correlations mixing both methods—using the **Administration** page or provisioning.

To enable this feature, contact Grafana Support.

## Grafana OnCall integration for Alerting

<!-- Brenda Muir -->
<!-- OSS, Enterprise -->

September 13, 2023

_Generally available in Grafana Cloud_

Use the Grafana Alerting - Grafana OnCall integration to effortlessly connect alerts generated by Grafana Alerting with Grafana OnCall. From there, you can route them according to defined escalation chains and schedules.

To learn more, refer to the [Grafana OnCall integration for Alerting documentation](/docs/grafana/next/alerting/alerting-rules/manage-contact-points/configure-oncall/).

## API throttling for Datadog data source

<!-- Taewoo Kim -->
<!-- OSS, Enterprise -->

September 1, 2023

_Generally available in Grafana Cloud_

The Datadog data source supports blocking API requests based on upstream rate limits (for metric queries). With this update, you can set a rate limit percentage at which the plugin stops sending queries.

To learn more, refer to [Datadog data source settings](/docs/plugins/grafana-datadog-datasource/latest#configure-the-data-source), as well as the following video demo.

{{< video-embed src="/media/docs/datadog/datadog-rate-limit.mp4" >}}

## Log aggregation for Datadog data source

<!-- Taewoo Kim -->
<!-- OSS, Enterprise -->

August 31, 2023

_Generally available in Grafana Cloud_

The Datadog data source now supports log aggregation. This feature helps aggregate logs/events into buckets and compute metrics and time series. For more information, refer to [Datadog log aggregation](/docs/plugins/grafana-datadog-datasource/latest#logs-analytics--aggregation).

{{< video-embed src="/media/docs/datadog/datadog-log-aggregation.mp4" >}}

## Permission validation on custom role creation and update

<!-- Mihaly Gyongyosi -->
<!-- Cloud -->

<!-- already in on-prem -->

August 25, 2023

_Generally available in Grafana Cloud_

With the current release, we enabled RBAC permission validation (`rbac.permission_validation_enabled` setting) by default. This means that the permissions provided in the request during custom role creation or update are validated against the list of [available permissions and their scopes](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/administration/roles-and-permissions/access-control/custom-role-actions-scopes/#action-definitions). If the request contains a permission that is not available or the scope of the permission is not valid, the request is rejected with an error message.

## Query-type template variables for Tempo data source

<!-- Fabrizio Casati -->
<!-- OSS, Enterprise -->

August 24, 2023

_Generally available in Grafana Cloud_

The Tempo data source now supports query-type template variables. With this update, you can create variables for which the values are a list of attribute names or attribute values seen on spans received by Tempo.

To learn more, refer to the following video demo, as well as the [Grafana Variables documentation](/docs/grafana/next/dashboards/variables/).

{{< video-embed src="/media/docs/tempo/screen-recording-grafana-10.2-tempo-query-type-template-variables.mp4" >}}
