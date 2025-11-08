# MIS	for	Real	Estate	Construction

# Product	Requirements	Document	(PRD)

**Prepared	For:	** — (Generic)

**Prepared	By:	** Samvit	AI	Solutions	Pvt.	Ltd.

**Version:	** 1.


## Module Index

1. Project	Master
2. User	&	Employee	Management
3. Finance	Position
4. Project	Progress
5. Accounts	Payable
6. Vendor	Master
7. Accounts	Receivable
8. Project	Budgeting	(Report)
9. Project	Execution	Status	(Report)
10. Sales	Summary
11. Project	Collection
12. Asset	Management
13. Safety	Compliance	&	Incidents
14. Quality	Assurance
15. Statutory	Compliance	(Project-Wise)


## Module 1: Project Master

### Objective

Central	registry	of	all	projects	with	administrative,	financial,	and	execution	baselines;	acts	
as	the	source	of	truth	referenced	by	every	other	module.

### Functional Scope

- Project	registration	and	lifecycle	status	(Planning	/	Execution	/	Completed	/	On-Hold).
- Financial	baseline:	Project	Value	(expected	income)	and	Expected	Project	Cost.
- Progress	snapshot:	%	completion	and	stage.
- Portfolio	and	exception	reporting.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Basic	Info Project	Code Auto	/	Unique Primary	identifier	
across	modules.
Basic	Info Project	Name Manual Official	project	title.
Basic	Info Project	Type Dropdown Residential	/	
Commercial	/	Infra	
etc.
Location Address	/	City	/	
State
```
```
Manual Site	location.
```
```
Location GPS	Coordinates Optional For	map	
dashboards.
Duration Planned	Start	Date Manual Target	
commencement.
Duration Planned	
Completion	Date
```
```
Manual Target	completion.
```
```
Team Project	Manager Select	(User) Primary	
responsible	person.
Team Site	Engineer(s) Multi-select	(User) Execution	team	
members.
Team Contractor	/	
Vendor
```
```
Select	(Vendor) Main	executing	
partner.
Financial Project	Value	
(Expected	Income)
```
```
Manual Total	expected	
revenue.
Financial Expected	Project	
Cost
```
```
Manual Budgeted	total	cost	
to	complete.
Financial	(Derived) Billed	Amount Derived	(Accounts	
Receivable)
```
```
Sum	of	invoices	
raised.
Financial	(Derived) Received	Amount Derived	(Project	
Collection/Receivable)
```
```
Total	realized	
receipts.
Financial	(Derived) Balance	to	be	Billed Derived Project	Value	−	
Billed.
```

```
Financial	(Derived) Balance	to	be	
Received
```
```
Derived Project	Value	−	
Received.
Status Current	Stage Dropdown Planning	/	
Execution	/	
Completed	/	On-
Hold.
Status %	Completion Manual	or	from	
Progress
```
```
Overall	completion	
snapshot.
Notes Remarks Text Key	highlights	or	
risks.
```
### Reports / Dashboards

- Project	Portfolio	Summary	(Value,	Cost,	Billed,	Received,	Balances).
- Project	Financial	Snapshot	(per	project).
- Progress	vs	Schedule	Exception	Report.

### Workflow Overview

16. Create	project	with	financial	baselines.
17. Assign	team	and	status;	approve	project.
18. Periodic	updates	to	%	completion	and	remarks.
19. Management	reviews	dashboards;	exceptions	flagged.

### Roles & Responsibilities

```
Role Responsibility
Planning	/	HO Create	and	maintain	project	records.
Project	Manager Update	status	and	remarks.
Management Review	portfolio	and	exceptions.
```
### Dependencies

```
Linked	Module Purpose
User	&	Employee	Management Assign	responsible	users.
Accounts	Receivable	/	Project	Collection Provide	billed/received	totals.
Project	Progress Provides	%	completion	(for	snapshot).
```
### Derived Values (Auto-calculated)

```
Field Derived	From	/	Formula Purpose
Balance	to	be	Billed Project	Value	−	Billed Pipeline	yet	to	invoice.
Balance	to	be	Received Project	Value	−	Received Pending	collections.
```

### Business Value

- Single	source	of	truth	for	project	identity	and	baselines.
- Enables	cross-module	financial	reconciliation.
- Simplifies	executive	decision-making.


## Module 2: User & Employee Management

### Objective

Unified	master	for	system	users	and	employees,	covering	roles,	access,	project	assignments,	
and	essential	HR	fields	(joining,	resignation,	salary,	settlement).

### Functional Scope

- User	profiles	and	authentication	context.
- Role	&	permission	allocation	by	module.
- Project	assignments	and	reporting	hierarchy.
- Employee	lifecycle	tracking	(DOJ,	resignation,	salary,	last	paid,	settlement).
- Audit	trail	and	user	directory	reports.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Basic Employee	ID Auto Unique	employee	
identifier.
Basic Full	Name Manual Employee	name.
Org Designation Manual Role/position.
Org Department Dropdown Finance	/	
Engineering	/	HR	/	
QA	/	Safety	/	Admin.
Contact Email Manual Official	email	for	
access	and	comms.
Contact Mobile Manual For	alerts/OTP.
Employment Date	of	Joining Manual Start	date.
Employment Date	of	Resignation Manual If	applicable.
Employment Employment	Status Derived Active	/	Resigned	/	
Settled.
Payroll Salary	(Monthly) Manual Current	salary.
Payroll Salary	Last	Paid	
(Date)
```
```
Manual Latest	payroll	paid	
date.
Payroll Final	Settlement	
Done	(Y/N)
```
```
Manual Flag	after	F&F	
payment.
Access Role Dropdown Admin	/	Manager	/	
Engineer	/	
Accountant	etc.
Access Modules	Assigned Multi-select Module-level	access	
map.
Access Projects	Assigned Multi-select Limits	visibility	to	
linked	projects.
Access Login	Status Toggle Active	/	Inactive.
```

### Reports / Dashboards

- Employee	Directory	&	Access	Matrix.
- Active	vs	Resigned	Summary.
- Salary	&	Settlement	Tracking	Report.
- Project-wise	Employee	Mapping.

### Workflow Overview

20. Create	user/employee	profile	and	assign	roles.
21. Map	modules	and	projects	for	access	scope.
22. Update	employment/salary/settlement	details.
23. Periodic	review	of	inactive	or	exited	users.

### Roles & Responsibilities

```
Role Responsibility
HR	/	Admin Maintain	employee	records	and	access.
Project	Manager Assign	project	responsibilities.
Finance	Executive Update	salary	paid	and	settlement	status.
Management Review	staffing	and	settlements.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Project	linkage	for	assignments.
All	Operational	Modules Use	user	IDs	for	'entered	by'	and	approvals.
```
### Business Value

- Combines	people	&	access	management	in	one	place.
- Improves	accountability	and	audit	readiness.
- Saves	effort	vs	a	separate	HRMS	for	basic	needs.


## Module 3: Finance Position

### Objective

Daily	liquidity	view	capturing	receipts,	payments,	and	balances	across	bank	accounts	and	
cash	in	hand	by	project.

### Functional Scope

- Daily	cash/bank	entry	per	account.
- Opening/closing	balance	computation.
- Project-wise	and	consolidated	daily	position.
- Trend	and	exception	reporting.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Header Date Manual	/	Default	
Today
```
```
Transaction	day.
```
```
Header Project	/	Site Select	(Project) Context	for	entry.
Account Account	Name Select	(Bank/Cash	
Master)
```
```
Specific	bank	or	
cash-in-hand.
Balances Opening	Balance Auto-carry From	previous	
closing.
Flows Receipts	(Inflow) Manual Total	cash	received	
today.
Flows Payments	(Outflow) Manual Total	cash	paid	
today.
Balances Closing	Balance Derived Opening	+	Receipts	
−	Payments.
Notes Remarks Text Explanation	for	
major	movement.
```
### Reports / Dashboards

- Daily	Cash	Sheet	(per	project	&	account).
- Consolidated	Finance	Position	(organization).
- Cash	Flow	Trend;	Missing	Entry	Report;	Exception	Summary.

### Workflow Overview

24. Enter	receipts	and	payments	per	account.
25. Optional	verification	by	manager/finance	head.
26. View	consolidated	balances	and	trends.


### Roles & Responsibilities

```
Role Responsibility
Site	Accountant	/	Finance	Exec Enter	daily	inflows/outflows.
Project	Manager	/	Finance	Head Verify/approve	entries.
Management Review	consolidated	liquidity.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Project	identities.
User	&	Employee	Management Entry	and	approval	accountability.
```
### Derived Values (Auto-calculated)

```
Field Derived	From	/	Formula Purpose
Closing	Balance Opening	+	Receipts	−	
Payments
```
```
End-of-day	position.
```
### Business Value

- Delivers	daily	liquidity	visibility	for	quick	decisions.
- Improves	cash	discipline	and	early	detection	of	shortages.


## Module 4: Project Progress

### Objective

Tracks	activity-level	progress	and	ties	outsourced	activities	to	vendors	and	payables	to	give	
cost	visibility	along	with	physical	progress.

### Functional Scope

- Activity/WBS	progress	capture	with	planned	vs	actual.
- Milestone	tracking	with	planned/actual	dates	and	delays.
- Execution	Type	(In-House	/	Outsourced)	and	Vendor	linkage.
- Derived	cost	insights	from	Accounts	Payable.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Header Project	Name Select	(Project) Project	reference.
Header Date	of	Entry Manual	/	Default Reporting	date.
Activity Activity	/	WBS	/	
Work	Package
```
```
Manual Work	item/stage.
```
```
Activity Unit	of	
Measurement
```
```
Manual %,	sqft,	nos,	etc.
```
```
Plan Planned	Quantity Manual Target	quantity.
Actual Actual	Quantity	
Completed
```
```
Manual Done	this	period	or	
to	date.
Derived Cumulative	
Completed	Quantity
```
```
Derived Auto-sum	over	time.
```
```
Derived Planned	Progress	% Derived Based	on	baseline	
schedule.
Derived Actual	Progress	% Derived (Cumulative	÷	
Planned	Total)	×	
100.
Derived Variance	% Derived Actual	−	Planned.
Execution Execution	Type Dropdown In-House	/	
Outsourced.
Execution Vendor	Name	(if	
Outsourced)
```
```
Select	(Vendor) Required	if	
outsourced.
Execution Work	Order/Bill	Ref Text Reference	for	
linkage.
Cost Activity	Cost	
Estimate
```
```
Manual Baseline	for	the	
activity.
Cost Amount	Paid	to	
Vendor
```
```
Derived	(Payables) Cumulative	
payments.
Cost Balance	Payable Derived Estimate	−	Paid.
Milestone Milestone	Name Manual Key	milestone.
```

```
Milestone Planned	Completion	
Date
```
```
Manual Target	date.
```
```
Milestone Actual	Completion	
Date
```
```
Manual Achieved	date.
```
```
Derived Delay	(Days) Derived Actual	−	Planned.
Notes Remarks Text Issues	or	blockers.
```
### Reports / Dashboards

- Project	Progress	Summary	(planned	vs	actual	%).
- Activity-Level	Progress	&	Cost	Report.
- Vendor-Linked	Progress	(cost	vs	completion).
- Variance	&	Delay	Reports;	Project	Health	Dashboard.

### Workflow Overview

27. Engineer	updates	progress	and	execution	type.
28. If	outsourced,	link	vendor	and	(optionally)	bill	ref.
29. Manager	reviews	and	approves	entries.
30. Derived	dashboards	provide	integrated	view.

### Roles & Responsibilities

```
Role Responsibility
Site	Engineer	/	Supervisor Enter	progress	and	remarks.
Project	Manager Validate	and	approve.
Finance	Executive Maintain	payables	that	feed	cost	view.
Management Review	progress	and	vendor	exposure.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Baseline	and	identities.
Vendor	Master Vendor	list	for	outsourced	work.
Accounts	Payable Payments	feeding	cost	view.
User	&	Employee	Management Accountability	mapping.
```
### Derived Values (Auto-calculated)

```
Field Derived	From	/	Formula Purpose
Cumulative	Completed	Qty Historical	entries Total	achieved	to	date.
Variance	% Planned	vs	Actual Schedule	adherence.
Amount	Paid	to	Vendor Accounts	Payable Financial	progress.
Balance	Payable Estimate	−	Paid Unpaid	exposure.
```

```
Delay	(Days) Planned	vs	Actual	Milestone Schedule	slippage.
```
### Business Value

- Unifies	physical	&	financial	progress	without	heavy	data	entry.
- Enables	vendor	and	activity	cost	visibility	for	control.


## Module 5: Accounts Payable

### Objective

Records	vendor	bills	and	payments	with	project	and	optional	activity	tags,	enabling	vendor-
wise	and	activity-wise	liability	control.

### Functional Scope

- Bill	entry	with	tax	and	due	dates.
- Partial/full	payment	tracking	and	status.
- Optional	activity	linkage	for	outsourced	work.
- Aging	and	exception	monitoring.

### Data Fields

```
Category Field Entry	Type Description	/	Purpose
Header Project	Name Select	(Project) Project	association.
Header Activity	/	
Work	
Package	
(Optional)
```
```
Select	(Progress) Tag	for	activity-level	costing.
```
```
Party Vendor	Name Select	(Vendor) Payee	party.
Bill Invoice/Bill	
Number
```
```
Manual Vendor	reference.
```
```
Bill Bill	Date Manual Invoice	date.
Bill Bill	Amount	
(Excl.	Tax)
```
```
Manual Base	amount.
```
```
Bill Tax	Amount Manual/Optional GST/TDS	etc.
Derived Total	Invoice	
Amount
```
```
Derived Base	+	Tax.
```
```
Bill Cost	Head	/	
Category
```
```
Dropdown Material/Labour/Subcontract/Admin,	
etc.
Bill Due	Date Manual Payment	due	date.
Bill Payment	
Terms
```
```
Dropdown 15/30	days,	on	completion,	etc.
```
```
Payment Amount	Paid	
to	Date
```
```
Derived Sum	of	payments.
```
```
Payment Balance	
Payable
```
```
Derived Total	−	Paid.
```
```
Payment Last	Payment	
Date
```
```
Derived Most	recent	payment	date.
```
```
Derived Payment	
Status
```
```
Derived Paid	/	Partially	Paid	/	Unpaid.
```
```
Approvals Verified	By Manual PM	/	Site	Accountant.
Approvals Approved	By Manual Finance	Head.
Notes Attachments	
/	Remarks
```
```
Manual Supporting	docs/comments.
```

### Reports / Dashboards

- Vendor	Payable	Summary	(with	project	&	activity).
- Project	Activity	Cost	Report.
- Project-wise	Payable	Summary;	Aging	Report.
- Pending	Approvals;	Exception	(duplicate/overdue).

### Workflow Overview

31. Enter	bill	with	project	and	optional	activity	tag.
32. Verify	&	approve;	record	payments	as	made.
33. System	derives	status	and	balances	for	reporting.

### Roles & Responsibilities

```
Role Responsibility
Site	Accountant	/	Finance	Exec Enter	bills	and	payments.
Project	Manager Verify	activity-linked	bills.
Finance	Head Approve	and	schedule	payments.
Management Review	vendor	exposure	and	aging.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Project	context.
Vendor	Master Vendor	list	&	terms.
Project	Progress Activities	for	optional	tagging.
User	&	Employee	Management Accountability	and	approvals.
```
### Derived Values (Auto-calculated)

```
Field Derived	From	/	Formula Purpose
Total	Invoice	Amount Base	+	Tax Gross	liability.
Balance	Payable Total	−	Paid Outstanding	amount.
Payment	Status Rules	on	
Paid/Partial/Unpaid
```
```
Quick	classification.
```
### Business Value

- Enables	per-project	and	per-activity	cost	visibility.
- Supports	strong	vendor	governance	and	cash	planning.



## Module 6: Vendor Master

### Objective

Single	source	of	truth	for	vendors	with	compliance,	banking,	and	engagement	mapping	to	
projects/activities;	shows	derived	billed/paid/balance	from	Payables.

### Functional Scope

- Vendor	registration	and	approval.
- Categorization	and	compliance	(PAN/GST/MSME).
- Project	&	activity	linkage	overview.
- Financial	exposure	and	performance	view.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Identity Vendor	Code Auto/Unique System	ID.
Identity Vendor	Name Manual Registered	name.
Identity Vendor	Type Dropdown Contractor	/	
Supplier	/	
Consultant	/	Service	
Provider.
Contact Contact	Person Manual Primary	contact.
Contact Email	/	Mobile Manual Communication	
details.
Address Office	Address Manual Address	/	City	/	
State	/	PIN.
Compliance PAN	/	GST	/	MSME	
No.
```
```
Manual For	audit	and	
payments.
Banking Bank	/	Account	No.	
/	IFSC
```
```
Manual For	disbursement.
```
```
Terms Payment	Terms Dropdown 15/30/45	days,	etc.
Engagement Associated	Projects Multi-select	
(Project)
```
```
Where	the	vendor	is	
active.
Engagement Linked	Activities Multi-select	
(Progress)
```
```
Activities	handled	
by	vendor.
Derived Total	Billed	Amount Derived	(Payables) Sum	of	invoices.
Derived Total	Paid	Amount Derived	(Payables) Sum	of	payments.
Derived Balance	Payable Derived Billed	−	Paid.
Performance Vendor	Rating Manual/Derived 1 – 5	score.
Performance Last	Review	Date Derived Auto	when	rating	
changes.
Status Active	/	Inactive Toggle Usage	control.
Notes Remarks Text Performance	notes.
```

### Reports / Dashboards

- Vendor	Directory	&	Compliance	Report.
- Vendor	Project–Activity	Summary.
- Vendor	Payment	Summary;	Project-wise	Exposure.
- Performance	Rating	Dashboard.

### Workflow Overview

34. Create	vendor;	verify	compliance;	activate.
35. Map	to	projects/activities	as	needed.
36. Payables	feed	billed/paid	for	exposure	view.

### Roles & Responsibilities

```
Role Responsibility
Procurement	/	Finance Create	&	verify	vendor	master.
Project	Manager Provide	activity	mapping	&	feedback.
Management Review	performance	&	exposure.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Project	linkage.
Accounts	Payable Financial	exposure.
Project	Progress Activity	linkage	for	outsourced	work.
User	&	Employee	Management Access	controls.
```
### Business Value

- Prevents	duplicate/fraud	entries;	audit-ready.
- Enables	vendor	performance	and	exposure	visibility.


## Module 7: Accounts Receivable

### Objective

Tracks	invoices	raised	and	payments	received	from	customers	per	project;	provides	billed,	
received,	and	outstanding	receivables.

### Functional Scope

- Invoice	entry	with	tax	and	due	dates.
- Recording	of	partial/full	receipts.
- Aging	and	overdue	monitoring.
- Client	ledger	and	cash	forecast.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Header Project	Name Select	(Project) Project	association.
Party Client	/	Customer	
Name
```
```
Manual/Dropdown Buyer	entity.
```
```
Invoice Invoice	Number Manual Reference	number.
Invoice Invoice	Date Manual Issuance	date.
Invoice Invoice	Amount	
(Excl.	Tax)
```
```
Manual Base	billed	amount.
```
```
Invoice Tax	Amount Manual/Optional GST/TDS	etc.
Derived Total	Invoice	
Amount
```
```
Derived Base	+	Tax.
```
```
Invoice Due	Date Manual Expected	payment	
date.
Invoice Payment	Terms Dropdown 7/30	days,	on	
milestone,	etc.
Receipt Amount	Received	to	
Date
```
```
Derived Sum	of	receipts.
```
```
Receipt Balance	Receivable Derived Total	−	Received.
Receipt Last	Payment	Date Derived Most	recent	receipt	
date.
Derived Collection	Status Derived Paid	/	Partially	Paid	
/	Unpaid.
Approvals Verified/Approved	
By
```
```
Manual Reviewers.
```
```
Notes Attachments	/	
Remarks
```
```
Manual Invoice	copy/notes.
```
### Reports / Dashboards

- Project-wise	Receivable	Summary.


- Client	Ledger;	Aging	Report.
- Collection	Register;	Pending/Overdue	Invoices.
- Cash	Forecast	by	due	dates.

### Workflow Overview

37. Enter	invoice;	verify	and	approve.
38. Record	receipts	as	received.
39. System	derives	balances	and	status.

### Roles & Responsibilities

```
Role Responsibility
Finance	Executive	/	Site	Accountant Enter	invoices	&	receipts.
Project	Manager Validate	milestone-based	billing.
Finance	Head Approve	&	monitor	collections.
Management Review	receivable	health.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Project	linkage.
User	&	Employee	Management Accountability	controls.
```
### Derived Values (Auto-calculated)

```
Field Derived	From	/	Formula Purpose
Total	Invoice	Amount Base	+	Tax Gross	billing.
Balance	Receivable Total	−	Received Outstanding	dues.
```
### Business Value

- Provides	visibility	into	cash	inflows	and	receivable	risk.
- Supports	realistic	cash-flow	planning.


## Module 8: Project Budgeting (Report)

### Objective

Derived	variance	analysis	between	expected	cost	baseline	and	actual/committed	costs	
pulled	from	Payables	and	Finance	Position.

### Functional Scope

- Use	Expected	Project	Cost	from	Project	Master	as	baseline.
- Aggregate	actual	spend	and	committed	costs	from	Payables.
- Compute	variance	and	trend.
- Provide	portfolio	and	per-project	views.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Baseline Expected	Project	
Cost
```
```
From	Project	Master Budgeted	cost	to	
complete.
Actuals Actual	Cost	to	Date From	Accounts	
Payable	/	Finance	
Position
```
```
Cumulative	spend	
and	payments.
```
```
Commitment Committed	Cost From	Payables	
(unpaid	approved)
```
```
Outstanding	
approved	bills.
Derived Budget	Variance	(₹) Derived Expected	−	Actual.
Derived Budget	Variance	
(%)
```
```
Derived (Variance	÷	
Expected)	×	100.
Derived Revenue	vs	Cost	% Derived Actual	Cost	÷	
Project	Value	×	100.
```
### Reports / Dashboards

- Project	Budget	vs	Actual	Report.
- Variance	Trend	Chart.
- Top	Overrun	Projects.

### Workflow Overview

40. Baseline	set	in	Project	Master.
41. Actuals	auto-pulled;	variance	computed.
42. Management	reviews	trends	monthly.


### Roles & Responsibilities

```
Role Responsibility
Finance	Team Validate	spend	&	commitments.
Project	Manager Monitor	variance	&	add	remarks.
Management Review	overruns	and	actions.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Baselines.
Accounts	Payable	/	Finance	Position Actuals	and	commitments.
```
### Derived Values (Auto-calculated)

```
Field Derived	From	/	Formula Purpose
Budget	Variance Expected	−	Actual Cost	control	signal.
Revenue	vs	Cost	% Actual	÷	Project	Value	×	100 Profitability	indicator.
```
### Business Value

- Delivers	cost	control	without	extra	data	entry.


## Module 9: Project Execution Status (Report)

### Objective

Derived	snapshot	of	execution	status	(completed	stages	and	%	completion)	from	Project	
Progress,	with	optional	remarks.

### Functional Scope

- Stage-wise	status	and	completion	%	from	Progress.
- Variance	vs	planned	schedule.
- Optional	manager	remarks	for	context.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Header Project	Name From	Project	Master Project	identity.
Execution WBS	/	Step From	Project	
Progress
```
```
Major	stages.
```
```
Derived Completed	Stages From	Project	
Progress
```
```
List	of	achieved	
milestones.
Derived %	Completion From	Project	
Progress
```
```
Overall	completion	
till	date.
Derived Planned	Completion	
%
```
```
From	schedule Benchmark.
```
```
Derived Variance	% Derived Actual	−	Planned.
Remarks Status	Remarks Manual	(optional) Short	note	by	PM.
```
### Reports / Dashboards

- Project	Execution	Status	Summary.
- Stage-wise	Progress	Report.
- Variance	Dashboard;	Project	Health	Overview.

### Workflow Overview

43. Fetch	latest	progress;	compute	variance.
44. PM	optionally	adds	remarks.
45. Dashboard	refresh	for	management.

### Roles & Responsibilities

```
Role Responsibility
Project	Manager	/	Site	Engineer Maintain	progress	entries	in	Module	4.
```

```
Management Review	summary	dashboards.
```
### Dependencies

```
Linked	Module Purpose
Project	Progress Primary	source.
Project	Master Context	and	schedule.
```
### Business Value

- Zero	extra	data	entry;	instant	management	view.


## Module 10: Sales Summary

### Objective

Lightweight	entry	of	project-level	sales	inventory	and	stage-wise	status	(Bookings,	
Agreements,	Sale	Deed)	with	SBA/CA;	feeds	Sales	Reports.

### Functional Scope

- Maintain	totals	of	units	and	areas	(SBA,	CA).
- Stage-wise	counts	and	areas	for	Booking/Agreement/Sale	Deed.
- Automatic	unsold	and	%	sold	derivations.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Header Project	Name Select	(Project) Project	reference.
Inventory Total	Units	
(Flats/Plots)
```
```
Manual Total	saleable	units.
```
```
Inventory Total	SBA	(sq.ft) Manual Saleable	area.
Inventory Total	CA	(sq.ft) Manual Carpet	area.
Booking Units	Booked Manual Count.
Booking SBA	(Booked) Manual Area	in	bookings.
Booking CA	(Booked) Manual Area	in	bookings.
Agreement Units	in	Agreement Manual Count.
Agreement SBA	(Agreement) Manual Area	in	agreement	
stage.
Agreement CA	(Agreement) Manual Area	in	agreement	
stage.
Sale	Deed Units	Registered Manual Count.
Sale	Deed SBA	(Sale	Deed) Manual Registered	area.
Sale	Deed CA	(Sale	Deed) Manual Registered	area.
```
### Reports / Dashboards

- Sales	Summary	Report	(stage-wise).
- Sales	Conversion	Report.
- Unsold	Inventory	&	Area	Utilization.

### Workflow Overview

46. Update	stage-wise	figures	weekly/monthly.
47. System	derives	unsold	and	%	sold.
48. Management	reviews	dashboards.


### Roles & Responsibilities

```
Role Responsibility
Sales	Executive	/	Accountant Enter	summary	figures.
Sales	Head	/	PM Verify	updates.
Management Review	sales	velocity.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Context.
User	&	Employee	Management Access	control.
```
### Derived Values (Auto-calculated)

```
Field Derived	From	/	Formula Purpose
Unsold	Units Total	−	(Booked	+	
Registered)
```
```
Inventory	left.
```
```
Unsold	SBA/CA Total	area	−	(Booked	+	
Registered)
```
```
Area	left.
```
```
%	Units	Sold (Booked	+	Registered)	÷	
Total	×	100
```
```
Sales	progress.
```
```
%	Area	Sold	(SBA/CA) (Booked+Registered	area)	÷	
Total	area	×	100
```
```
Utilization.
```
### Business Value

- Gives	MD	a	clean	view	without	CRM	overload.


## Module 11: Project Collection

### Objective

Standalone	capture	of	collections	realized	at	Booking,	Agreement,	and	Sale	Deed	stages;	
compares	to	Project	Value	to	show	pending.

### Functional Scope

- Stage-wise	collection	entry	per	project.
- Auto	compute	total	collected,	balance,	and	%	realized.
- Stage	distribution	dashboard.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Header Project	Name Select	(Project) Project	reference.
Baseline Project	Value	
(Expected	Income)
```
```
Derived	(Project	
Master)
```
```
Target	revenue.
```
```
Collections Amount	at	Booking	
Stage
```
```
Manual Typically	~10%.
```
```
Collections Amount	at	
Agreement	Stage
```
```
Manual E.g.,	~50%.
```
```
Collections Amount	at	Sale	
Deed	Stage
```
```
Manual Registration	
collections.
Derived Total	Collection	to	
Date
```
```
Derived Sum	of	stages.
```
```
Derived Balance	Amount Derived Project	Value	−	
Total	Collected.
Derived %	Collection	
Realized
```
```
Derived Collected	÷	Value	×	
100.
Derived %	Balance	Pending Derived 100	−	%	Realized.
```
### Reports / Dashboards

- Project	Collection	Summary.
- Stage-wise	Collection	Report.
- Collection	Progress	Dashboard;	Pending	Collection	Report.

### Workflow Overview

49. Enter	stage	collections;	review	&	approve.
50. System	derives	totals	and	percentages.
51. Dashboards	highlight	gaps.


### Roles & Responsibilities

```
Role Responsibility
Finance	Executive	/	Site	Accountant Enter	collections.
PM	/	Finance	Head Verify	stage	totals.
Management Monitor	realization	vs	value.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Provides	project	value	baseline.
User	&	Employee	Management Access	and	audit.
```
### Derived Values (Auto-calculated)

```
Field Derived	From	/	Formula Purpose
Total	Collection Sum	of	stages Realized	revenue.
Balance Value	−	Collected Pending	amount.
%	Realized Collected	÷	Value	×	100 Progress	indicator.
```
### Business Value

- Quick	stage-level	cash	view	without	AR	complexity.


## Module 12: Asset Management

### Objective

Visibility	of	owned	and	hired	assets:	where	they	are,	who	is	responsible,	and	associated	
value/cost;	supports	transfer	readiness.

### Functional Scope

- Asset	registration	and	classification.
- Deployment	to	projects	and	status	(Active/Idle/Ready	for	Transfer).
- Ownership	type	(Owned/Hired/Leased)	with	value	or	recurring	hire	cost.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
ID Asset	Code Manual	/	Auto Unique	asset	
identifier.
ID Asset	Name	/	
Description
```
```
Manual Equipment	or	tool.
```
```
Class Asset	Group Dropdown Machinery	/	Vehicle	
/	Tools	/	IT	/	
Furniture.
Class Asset	Category Dropdown Heavy	/	Small	/	
Office	etc.
Financial Asset	Value	(if	
owned)
```
```
Manual Purchase	cost.
```
```
Financial Invoice	Amount	(if	
hired)
```
```
Manual Hire/rental	invoice.
```
```
Financial Recurrence	Flag Dropdown One-time	/	Monthly	
/	Quarterly.
Dates Date	of	Purchase Manual Purchase	date.
Dates Date	Put	to	Use Manual Operational	date.
Ownership Ownership	Type Dropdown Self-Owned	/	Hired	
/	Leased.
Ownership Vendor	Name	(if	
hired)
```
```
Select	(Vendor) Supplier	for	hire.
```
```
Deploy Project	Name Select	(Project) Current	
deployment.
Deploy Responsible	Person Manual Current	accountable	
user.
Deploy Status Dropdown Actively	Used	/	Not	
Used	/	Ready	for	
Transfer.
Notes Remarks Text Comments	or	
maintenance	notes.
```

### Reports / Dashboards

- Project-wise	Asset	Summary	(count,	owned	value,	hired	cost).
- Asset	Utilization	(Active/Idle/Transfer-Ready).
- Ownership	Mix;	Vendor-wise	Hire	Report.

### Workflow Overview

52. Enter	assets;	update	deployment	and	status.
53. Mark	transfer	readiness	as	needed.
54. Dashboards	compile	project	totals	and	costs.

### Roles & Responsibilities

```
Role Responsibility
Admin	/	Site	Accountant Maintain	asset	records.
Project	Manager Review	usage	and	transfers.
Finance	Head Monitor	values	and	recurring	costs.
Management View	utilization	and	cost	burden.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Deployment	context.
Vendor	Master Link	for	hired/leased	assets.
User	&	Employee	Management Responsible	person.
```
### Business Value

- Prevents	idle/unknown	assets;	improves	utilization	and	cost	control.


## Module 13: Safety Compliance & Incidents

### Objective

Two-part	safety	module	capturing	incidents	(reactive)	and	compliance	checklist	(proactive)	
for	complete	on-site	safety	governance.

### Functional Scope

- Incident	register	(accidents,	near-misses,	injuries).
- Compliance	checklist	(fire,	PPE,	scaffolding,	electrical,	signage).
- Open	vs	Closed	tracking	and	safety	scorecards.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Header Project	Name Select	(Project) Site	reference.
Incident Date	of	Incident Manual Occurrence	date.
Incident Incident	Type Dropdown Fall,	Electrical,	Fire,	
Equipment,	Material	
Handling,	etc.
Incident Description Text What	happened	and	
where.
Incident Location	on	Site Manual E.g.,	Tower	A	– 4th	
floor.
Incident Severity	Level Dropdown Minor	/	Major	/	
Fatal	/	Near-Miss.
Incident Injury	Type Dropdown None	/	First-Aid	/	
Medical	/	
Hospitalization	/	
Fatal.
Incident Immediate	Action	
Taken
```
```
Text Immediate	
response.
Follow-up Root	Cause Text Investigation	
outcome.
Follow-up Corrective	Action Text Preventive	steps	
implemented.
Follow-up Closure	Date Manual When	closed.
Checklist Compliance	
Category
```
```
Dropdown Fire	Safety	/	PPE	/	
Scaffolding	/	
Electrical	/	First-Aid	
/	Signage	/	Waste.
Checklist Compliance	Item Manual Specific	check	item.
Checklist Compliance	Type Dropdown Statutory	/	Internal	
/	Contractor-
specific.
Checklist Last	Inspection	Date Manual Last	check	date.
```

```
Checklist Status Dropdown Complied	/	Partial	/	
Pending.
Checklist Next	Due	Date Manual Next	check	planned.
Resp. Responsible	Person Select	(User) Accountable	for	
compliance.
Notes Remarks Text Notes/attachments.
```
### Reports / Dashboards

- Incident	Register;	Project-wise	Incident	Summary.
- Incident	Severity	Trend;	Root	Cause	Summary.
- Safety	Compliance	Register;	Upcoming	Due	Compliances.
- Non-Compliance	Report;	Project	Safety	Scorecard.

### Workflow Overview

55. Record	incident;	verify	and	close	with	corrective	action.
56. Maintain	periodic	compliance	checklist.
57. Dashboards	summarize	incidents	and	compliance	%.

### Roles & Responsibilities

```
Role Responsibility
Site	Engineer	/	Supervisor Enter	incidents	and	checks.
Safety	Officer Investigate	and	verify	closures.
Project	Manager Monitor	safety	status.
Management Review	risk	and	compliance	health.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Project	linkage.
User	&	Employee	Management Responsible	assignments.
Vendor	Master	(optional) Identify	vendor	if	incident	in	outsourced	
area.
```
### Business Value

- Improves	safety	culture	and	regulatory	readiness.
- Enables	preventive	focus	via	compliance	tracking.


## Module 14: Quality Assurance

### Objective

Two-part	quality	module	recording	defects/non-conformities	and	tracking	
inspection/compliance	checklists;	links	to	activities	and	vendors	where	relevant.

### Functional Scope

- Defect	log	with	severity,	responsible	party,	and	closure	tracking.
- Quality	inspection	checklist	with	results	and	due	dates.
- Vendor	quality	performance	and	project	scorecards.

### Data Fields

```
Category Field Entry	Type Description	/	
Purpose
Header Project	Name Select	(Project) Site	reference.
Defect Date	of	Detection Manual When	defect	found.
Defect Inspection	Type Dropdown Structural	/	
Finishing	/	MEP	/	
Material	/	Other.
Defect Defect	Description Text Nature	&	location.
Defect Location	on	Site Manual E.g.,	Tower	B	– 2nd	
floor.
Defect Severity	Level Dropdown Minor	/	Major	/	
Critical.
Defect Responsible	Party Dropdown In-House	/	Vendor.
Defect Linked	Activity Select	(Progress) Activity	where	
defect	occurred.
Defect Vendor	Name	(if	
Outsourced)
```
```
Select	(Vendor) Responsible	vendor.
```
```
Action Action	Required Text Rectification	steps.
Action Target	Closure	Date Manual Planned	closure.
Action Actual	Closure	Date Manual Actual	closure.
Checklist Quality	Category Dropdown Material	/	
Workmanship	/	
Structural	/	Finishes	
/	Services	/	
Documentation.
Checklist Inspection	Item Manual Specific	test/check.
Checklist Compliance	Type Dropdown Statutory	/	Internal	
/	Client-driven.
Checklist Last	Inspection	Date Manual Most	recent	test	
date.
Checklist Result	/	Status Dropdown Pass	/	Fail	/	
Pending.
```

```
Checklist Test	Report	/	
Certificate	Ref.
```
```
Manual Traceability.
```
```
Checklist Next	Due	Date Manual Next	schedule.
Resp. Responsible	
Engineer
```
```
Select	(User) Accountable	person.
```
### Reports / Dashboards

- Quality	Incident	Register;	Project	Defect	Summary.
- Failed	Inspection	Log;	Upcoming	Inspections.
- Vendor	Quality	Performance;	Project	Quality	Scorecard.

### Workflow Overview

58. Log	defect;	track	and	close	after	rectification.
59. Update	inspection	results;	plan	next	due	dates.
60. Manager	verifies	closures;	dashboards	update.

### Roles & Responsibilities

```
Role Responsibility
QA	Engineer	/	Supervisor Enter	defects	and	inspections.
Project	Manager Verify	closures	and	status.
Vendor	/	Contractor Rectify	outsourced	defects.
Management Monitor	quality	KPIs.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Project	reference.
Project	Progress Link	defects	to	activities.
Vendor	Master Assign	responsible	vendors.
User	&	Employee	Management Accountability.
```
### Business Value

- Drives	continuous	quality	improvement	and	transparency.


## Module 15: Statutory Compliance (Project-Wise)

### Objective

Project-anchored	compliance	tracking	across	ROC,	GST,	Income	Tax,	Labour,	
Environmental,	Municipal,	PF-ESI,	and	contractual	items;	supports	roll-up	dashboards.

### Functional Scope

- Compliance	registry	per	project	with	periodicity	and	due	dates.
- Filing	status,	delay	tracking,	and	documentation.
- Project	and	corporate	roll-up	dashboards	with	alerts.

### Data Fields

```
Category Field Entry	Type Description	/	Purpose
Header Project	Name Select	(Project) Project	association.
Compliance Compliance	
Category
```
```
Dropdown ROC	/	GST	/	Income	Tax	/	
Labour	/	Environmental	/	
Municipal	/	PF-ESI	/	
Contractual.
Compliance Compliance	Item Manual Specific	filing	or	license	(e.g.,	
GSTR-3B,	ROC	Annual	
Return).
Compliance Statute	/	
Authority
```
```
Manual MCA,	GST,	IT	Dept,	PCB,	
Labour	Dept,	etc.
Frequency Periodicity Dropdown One-Time	/	Monthly	/	
Quarterly	/	Annual.
Frequency Period	Covered Manual e.g.,	Apr–Jun	2025.
Dates Due	Date Manual Legal	due	date.
Dates Filing	/	
Submission	Date
```
```
Manual Actual	filed	date.
```
```
Status Status Dropdown Complied	/	Pending	/	Filed	
Late	/	Not	Applicable.
Derived Delay	(Days) Derived Filing	Date	−	Due	Date.
Proof Document	
Reference
```
```
Upload	/	Text Acknowledgment/certificate	
no.
Resp. Responsible	
Person
```
```
Select	(User) Accountable	owner.
```
```
Resp. Department	/	
Function
```
```
Dropdown Finance	/	Legal	/	HR	/	Site	
Admin.
Notes Remarks Text Notes	on	delay/exemption.
```
### Reports / Dashboards

- Project-Wise	Compliance	Summary;	Category	Registers.
- Due	/	Upcoming	Compliances;	Overdue	Report.


- Compliance	Completion	%;	Corporate	Compliance	Dashboard.

### Workflow Overview

61. Define	applicable	compliances	per	project.
62. Update	status	and	attach	proof	after	filing.
63. Review	roll-up	dashboards	and	act	on	alerts.

### Roles & Responsibilities

```
Role Responsibility
Site	Admin	/	Finance	/	Legal Maintain	status	and	filings.
Project	Head Ensure	completion	at	site	level.
Corporate	Legal	/	CFO Verify	and	review	dashboards.
Management Monitor	overall	legal	health.
```
### Dependencies

```
Linked	Module Purpose
Project	Master Anchor	for	roll-ups.
User	&	Employee	Management Owners	&	approvals.
```
### Derived Values (Auto-calculated)

```
Field Derived	From	/	Formula Purpose
Delay	(Days) Filing	−	Due	Date Quantifies	lateness.
%	Compliance	Completed Filed	÷	Applicable	×	100 Health	KPI.
```
### Business Value

- Prevents	missed	filings;	improves	audit	readiness;	enables	roll-up	compliance	health.


