export function mergeSx(props: any) {
  const { activeProps, sx, ...rest } = props

  return {
    activeProps: {
      ...(activeProps ?? {}),
      sx: [activeProps?.sx, sx],
    },
    sx,
    ...rest,
  }
}
