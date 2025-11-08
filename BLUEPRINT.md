# Construction MIS Reports Dashboard - Blueprint

## Overview

This is a **placeholder structure** for a Construction Management Information System (MIS) Reports Dashboard built with Next.js 14 (App Router), ShadCN UI, and Tailwind CSS.

The application demonstrates 5 key report types from a 15-module PRD, designed for enterprise-grade management visibility.

---

## 📁 Project Structure

```
buildmis/
├── app/
│   ├── (dashboard)/
│   │   └── page.tsx                 # Home dashboard with KPI overview
│   ├── projects/
│   │   └── page.tsx                 # Projects list page (5 projects)
│   ├── reports/
│   │   ├── portfolio/
│   │   │   └── page.tsx             # Portfolio Summary report
│   │   ├── budget/
│   │   │   └── page.tsx             # Budget vs Actual report
│   │   ├── receivables/
│   │   │   └── page.tsx             # Receivables & Collections report
│   │   ├── progress/
│   │   │   └── page.tsx             # Project Progress report
│   │   └── safety/
│   │       └── page.tsx             # Safety & Compliance report
│   ├── settings/
│   │   └── page.tsx                 # Settings placeholder (dummy)
│   ├── layout.tsx                   # Root layout with LayoutShell
│   └── globals.css                  # Global styles
│
├── components/
│   ├── Sidebar.tsx                  # Left navigation sidebar (collapsible)
│   ├── Topbar.tsx                   # Top navigation bar
│   └── LayoutShell.tsx              # Main layout wrapper
│
├── data/
│   └── mock/
│       ├── projects.json            # 5 dummy projects data
│       ├── budget.json              # Budget vs Actual mock data
│       ├── receivables.json         # Receivables & Collections mock data
│       ├── progress.json            # Project Progress mock data
│       └── safety.json              # Safety & Compliance mock data
│
└── lib/
    └── utils.ts                     # Utility functions (cn, etc.)
```

---

## 🗺️ Routing Plan

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard Home | KPI overview cards summarizing all 5 reports |
| `/projects` | Projects List | List of 5 dummy projects with key details |
| `/reports/portfolio` | Portfolio Summary | Financial overview (Value, Cost, Billed, Received) |
| `/reports/budget` | Budget vs Actual | Cost variance analysis |
| `/reports/receivables` | Receivables & Collections | Billing and collection tracking |
| `/reports/progress` | Project Progress | Execution status and milestones |
| `/reports/safety` | Safety & Compliance | Incidents and compliance tracking |
| `/settings` | Settings | Placeholder page (not actively used) |

---

## 🎨 Layout & Navigation

### Global Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Topbar (Fixed)                                         │
│  - App Title: "Construction MIS Reports"                │
│  - Hamburger Menu (mobile)                              │
│  - User Icon (right)                                    │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Sidebar  │  Main Content Area                           │
│ (Collap- │  - Page-specific content                     │
│  sible)  │  - Charts, tables, cards                     │
│          │  - Responsive padding                        │
│          │                                              │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### Sidebar Navigation Structure

```
Dashboard (Home)
  └─ / (LayoutDashboard icon)

Reports (Expandable)
  ├─ Portfolio Summary → /reports/portfolio (Briefcase icon)
  ├─ Budget vs Actual → /reports/budget (TrendingUp icon)
  ├─ Receivables & Collections → /reports/receivables (DollarSign icon)
  ├─ Project Progress → /reports/progress (Activity icon)
  └─ Safety & Compliance → /reports/safety (Shield icon)

Projects
  └─ /projects (FolderKanban icon)

Settings
  └─ /settings (Settings icon)
```

### Responsive Behavior

- **Desktop (lg+)**: Sidebar always visible, content area shifts right
- **Mobile**: 
  - Sidebar hidden by default
  - Hamburger menu icon in Topbar toggles sidebar
  - Sidebar overlays content when open
  - Backdrop overlay closes sidebar on click

---

## 📊 Mock Data Structure

### 1. Projects Data (`projects.json`)
5 dummy projects with:
- Project Code, Name, Type (Residential/Commercial)
- Location (City, State)
- Current Stage, % Completion
- Planned Start/End Dates
- Project Manager, Site Engineers
- Financial data: Project Value, Expected Cost, Billed, Received, Balances

### 2. Budget Data (`budget.json`)
Budget variance analysis:
- Expected Cost (baseline)
- Actual Cost to Date
- Committed Cost
- Budget Variance (₹ and %)
- Revenue vs Cost %
- Status (Over/Under Budget)

### 3. Receivables Data (`receivables.json`)
Billing and collection tracking:
- Total Billed, Received, Balance Receivable
- Collection % Realized
- Stage-wise collections (Booking, Agreement, Sale Deed)
- Overdue amounts and aging days

### 4. Progress Data (`progress.json`)
Execution status:
- Overall % Completion
- Planned vs Actual Progress
- Variance and status
- Stage-wise progress (Foundation, Structure, MEP, Finishing)
- Milestone tracking with delays

### 5. Safety Data (`safety.json`)
Safety incidents and compliance:
- Incidents by severity (Minor, Major, Fatal, Near-Miss)
- Open vs Closed incidents
- Compliance checklist status by category
- Safety score per project
- Last incident date

---

## 🎯 Component Responsibilities

### LayoutShell
- Wraps all pages
- Manages sidebar open/close state
- Provides consistent layout structure
- Handles responsive behavior

### Topbar
- Fixed at top
- Displays app title
- Hamburger menu button (calls onMenuClick)
- User profile icon placeholder

### Sidebar
- Vertical navigation menu
- Collapsible on mobile
- Active route highlighting
- Expandable Reports submenu
- Icons from lucide-react

---

## 🚀 Next Steps (Implementation Plan)

### Phase 1: Layout Components
1. Implement Sidebar with navigation items and icons
2. Implement Topbar with hamburger menu and user icon
3. Implement LayoutShell with responsive layout logic
4. Add active route highlighting
5. Test mobile responsiveness

### Phase 2: Dashboard Home
1. Create KPI summary cards
2. Aggregate data from all mock JSON files
3. Add quick stats grid
4. Add trend indicators
5. Add recent alerts section

### Phase 3: Projects Page
1. Create projects table/grid
2. Add project status badges
3. Add filters and search
4. Link to project details

### Phase 4: Report Pages (One by One)
For each report page:
1. Load and parse mock JSON data
2. Create summary cards with key metrics
3. Add data tables with sorting/filtering
4. Add charts (using Recharts or similar)
5. Add export functionality

### Phase 5: Polish & Enhancement
1. Add loading states
2. Add error handling
3. Add animations and transitions
4. Optimize performance
5. Add print/export features

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: ShadCN UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: (To be added - Recharts recommended)
- **State Management**: React hooks (useState, useContext if needed)

---

## 📝 Notes

- All page files contain placeholder comments indicating what needs to be built
- Mock data is comprehensive and realistic
- Component files have detailed TODO comments
- Layout is designed for enterprise-grade appearance
- Mobile-first responsive design approach

---

## 🎨 Design Principles

1. **Clean & Minimal**: Enterprise-grade, professional appearance
2. **Consistent Spacing**: Uniform padding and margins throughout
3. **Clear Hierarchy**: Proper heading levels and visual weight
4. **Accessible**: Proper contrast, keyboard navigation
5. **Responsive**: Mobile-first, works on all screen sizes
6. **Performance**: Optimized loading and rendering

---

## 📚 Reference

This blueprint is based on the PRD document (`mis_prd.md`) which defines 15 modules for a complete Construction MIS system. This demo focuses on 5 key report types for management visibility.

---

**Status**: ✅ Blueprint Complete - Ready for Implementation

All placeholder files are created with comprehensive comments. Each file can now be expanded step-by-step with full implementation.

