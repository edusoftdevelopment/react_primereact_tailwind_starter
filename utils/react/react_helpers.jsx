import { confirmDialog } from "primereact/confirmdialog"
import { lazy, Suspense } from "react"

export const lazyImport = (importFunction) => {
  const LazyComponent = lazy(importFunction)

  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export const displayOkDialog = ({
  accept = () => null,
  acceptLabel = "OK",
  header = "CheckReliance",
  message = "",
  icon = <i className="pi pi-exclamation-circle text-5xl text-white"></i>,
}) => {
  confirmDialog({
    accept,
    message: (
      <>
        <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
          <div
            className={`border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8`}
          >
            {icon}
          </div>
          <span className="font-bold text-2xl block mb-2 mt-4">{header}</span>
          <p className="mb-0 text-md text-center">{message}</p>
        </div>
      </>
    ),
    pt: {
      header: {
        className: "hidden",
      },
      content: {
        className: "p-0 rounded",
      },
      footer: {
        className: "[&>*:first-child]:hidden pb-4 pt-2 ",
      },
      root: {
        className: "w-25rem",
      },
    },
    acceptLabel,
  })
}

export const displayYesNoDialog = ({
  accept = () => null,
  reject = () => null,
  acceptLabel = "Yes",
  rejectLabel = "No",
  header = "Confirmation",
  message = "",
  icon = <i className="pi pi-question text-5xl text-white"></i>,
  acceptClassName,
  rejectClassName,
  iconContainerClassName = "",
  severity = "success",
  position,
  defaultFocus = "accept",
}) => {
  if (severity === "secondary") {
    iconContainerClassName += " bg-secondary"
    acceptClassName += " p-button-secondary"
    rejectClassName += " p-button-secondary"
  }
  if (severity === "danger") {
    iconContainerClassName += "bg-red-500"
    acceptClassName += " p-button-danger"
    rejectClassName += " p-button-danger"
  }
  if (severity === "warning") {
    iconContainerClassName += " bg-warning"
    acceptClassName += " p-button-warning"
    rejectClassName += " p-button-warning"
  }
  if (severity === "help") {
    iconContainerClassName += " bg-help"
    acceptClassName += " p-button-help"
    rejectClassName += " p-button-help"
  }
  if (severity === "info") {
    iconContainerClassName += " s-bg-info"
    acceptClassName += " p-button-info"
    rejectClassName += " p-button-info"
  }
  if (severity === "primary") {
    iconContainerClassName += " bg-primary"
    acceptClassName += " p-button-primary"
    rejectClassName += " p-button-primary"
  }

  confirmDialog({
    accept,
    reject,
    position,
    defaultFocus,
    message: () => (
      <>
        <div className="flex flex-col items-center p-5 surface-overlay rounded">
          <div
            className={`rounded-full text-white inline-flex justify-center items-center h-[6rem] w-[6rem] -mt-16 ${iconContainerClassName}`}
          >
            {icon}
          </div>
          <span className="font-bold text-2xl block mb-2 mt-4">{header}</span>
          <p className="mb-0 text-lg">{message}</p>
        </div>
      </>
    ),
    pt: {
      header: {
        className: "hidden",
      },
      content: {
        className:
          "p-0 flex items-center justify-center overflow-visible rounded",
      },
      footer: {
        className: "flex items-center justify-between flex-row-reverse gap-2",
      },
      root: {
        className: "w-25rem",
      },
    },
    acceptClassName: `flex-1 ${acceptClassName}`,
    rejectClassName: `flex-1 p-button-outlined ${rejectClassName}`,
    acceptLabel,
    rejectLabel,
  })
}
