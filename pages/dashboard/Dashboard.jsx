import React, { useState, useEffect } from "react"
import { FilterMatchMode, FilterOperator } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { IconField } from "primereact/iconfield"
import { InputIcon } from "primereact/inputicon"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { Button } from "primereact/button"
import { ProgressBar } from "primereact/progressbar"
import { Calendar } from "primereact/calendar"
import { MultiSelect } from "primereact/multiselect"
import { Slider } from "primereact/slider"
import { Tag } from "primereact/tag"

export default () => {
  const [customers, setCustomers] = useState([
    {
      id: 1000,
      name: "James Butt",
      country: {
        name: "Algeria",
        code: "dz",
      },
      company: "Benton, John B Jr",
      date: new Date(),
      status: "unqualified",
      verified: true,
      activity: 17,
      representative: {
        name: "Ioni Bowcher",
        image: "ionibowcher.png",
      },
      balance: 70663,
    },
    {
      id: 1001,
      name: "Josephine Darakjy",
      country: {
        name: "Egypt",
        code: "eg",
      },
      company: "Chanay, Jeffrey A Esq",
      date: new Date(),
      status: "proposal",
      verified: false,
      activity: 9,
      representative: {
        name: "Amy Elsner",
        image: "amyelsner.png",
      },
      balance: 82429,
    },
    {
      id: 1002,
      name: "Art Venere",
      country: {
        name: "Panama",
        code: "pa",
      },
      company: "Chemel, James L Cpa",
      date: new Date(),
      status: "qualified",
      verified: true,
      activity: 63,
      representative: {
        name: "Asiya Javayant",
        image: "asiyajavayant.png",
      },
      balance: 28334,
    },
    {
      id: 1003,
      name: "Lenna Paprocki",
      country: {
        name: "Slovenia",
        code: "si",
      },
      company: "Feltz Printing Service",
      date: new Date(),
      status: "new",
      verified: false,
      activity: 5,
      representative: {
        name: "Xuxue Feng",
        image: "xuxuefeng.png",
      },
      balance: 88521,
    },
    {
      id: 1004,
      name: "Donette Foller",
      country: {
        name: "South Africa",
        code: "za",
      },
      company: "Printing Dimensions",
      date: new Date(),
      status: "negotiation",
      verified: true,
      activity: 23,
      representative: {
        name: "Stephen Shaw",
        image: "stephenshaw.png",
      },
      balance: 98763,
    },
  ])
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState("")
  const [representatives] = useState([
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ])
  const [statuses] = useState([
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
  ])

  const getSeverity = (status) => {
    switch (status) {
      case "unqualified":
        return "danger"

      case "qualified":
        return "success"

      case "new":
        return "info"

      case "negotiation":
        return "warning"

      case "renewal":
        return null
    }
  }

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date)

      return d
    })
  }

  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters["global"].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h4 className="m-0">Customers</h4>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    )
  }

  const countryBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt="flag"
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`flag flag-${rowData.country.code}`}
          style={{ width: "24px" }}
        />
        <span>{rowData.country.name}</span>
      </div>
    )
  }

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.representative

    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={representative.name}
          src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`}
          width="32"
        />
        <span>{representative.name}</span>
      </div>
    )
  }

  const representativeFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <div className="mb-3 font-bold">Agent Picker</div>
        <MultiSelect
          value={options.value}
          options={representatives}
          itemTemplate={representativesItemTemplate}
          onChange={(e) => options.filterCallback(e.value)}
          optionLabel="name"
          placeholder="Any"
          className="p-column-filter"
        />
      </React.Fragment>
    )
  }

  const representativesItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={option.name}
          src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`}
          width="32"
        />
        <span>{option.name}</span>
      </div>
    )
  }

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date)
  }

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    )
  }

  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.balance)
  }

  const balanceFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    )
  }

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
  }

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    )
  }

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />
  }

  const activityBodyTemplate = (rowData) => {
    return (
      <ProgressBar
        value={rowData.activity}
        showValue={false}
        style={{ height: "6px" }}
      ></ProgressBar>
    )
  }

  const activityFilterTemplate = (options) => {
    return (
      <>
        <Slider
          value={options.value}
          onChange={(e) => options.filterCallback(e.value)}
          range
          className="m-3"
        ></Slider>
        <div className="flex align-items-center justify-content-between px-2">
          <span>{options.value ? options.value[0] : 0}</span>
          <span>{options.value ? options.value[1] : 100}</span>
        </div>
      </>
    )
  }

  const actionBodyTemplate = () => {
    return <Button type="button" icon="pi pi-cog" rounded></Button>
  }

  const header = renderHeader()

  return (
    <div className="card">
      <DataTable
        value={customers}
        paginator
        header={header}
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedCustomers}
        onSelectionChange={(e) => setSelectedCustomers(e.value)}
        filters={filters}
        filterDisplay="menu"
        size="small"
        globalFilterFields={[
          "name",
          "country.name",
          "representative.name",
          "balance",
          "status",
        ]}
        emptyMessage="No customers found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="country.name"
          header="Country"
          sortable
          filterField="country.name"
          style={{ minWidth: "14rem" }}
          body={countryBodyTemplate}
          filter
          filterPlaceholder="Search by country"
        />
        <Column
          header="Agent"
          sortable
          sortField="representative.name"
          filterField="representative"
          showFilterMatchModes={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "14rem" }}
          body={representativeBodyTemplate}
          filter
          filterElement={representativeFilterTemplate}
        />
        <Column
          field="date"
          header="Date"
          sortable
          filterField="date"
          dataType="date"
          style={{ minWidth: "12rem" }}
          body={dateBodyTemplate}
          filter
          filterElement={dateFilterTemplate}
        />
        <Column
          field="balance"
          header="Balance"
          sortable
          dataType="numeric"
          style={{ minWidth: "12rem" }}
          body={balanceBodyTemplate}
          filter
          filterElement={balanceFilterTemplate}
        />
        <Column
          field="status"
          header="Status"
          sortable
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={statusBodyTemplate}
          filter
          filterElement={statusFilterTemplate}
        />
        <Column
          field="activity"
          header="Activity"
          sortable
          showFilterMatchModes={false}
          style={{ minWidth: "12rem" }}
          body={activityBodyTemplate}
          filter
          filterElement={activityFilterTemplate}
        />
        <Column
          headerStyle={{ width: "5rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>
    </div>
  )
}