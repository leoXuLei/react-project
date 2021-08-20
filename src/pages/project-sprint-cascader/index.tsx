/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { CheckOutlined, DownOutlined } from '@ant-design/icons'
import { css, jsx } from '@emotion/core'
import { Button, Popover } from '@tuya-fe/sun'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as styles from './styles'
import { ProjectSelect, SprintSelect } from 'client/components/project-sprint-task-state-select'

export type IProjectParam = {
  projectId: { label: string; value: string }
  sprintId?: { label: string; value: string }
}

const ProjectSprintSelect = (props: {
  onChange: (v: IProjectParam) => void
  value?: IProjectParam
}) => {
  const [projectId, setProjectId] = useState<{ label: string; value: string }>()
  const [sprintId, setSprintId] = useState<{ label: string; value: string }>()
  const [visible, setVisible] = useState(false)

  const labelText = useMemo(() => {
    if (!props.value) {
      return '不放入空间'
    }
    return [props.value.projectId.label, props.value.sprintId?.label].filter((c) => !!c).join('·')
  }, [props.value])

  return (
    <Popover
      trigger="click"
      overlayClassName="popselect-overlay"
      placement="bottomLeft"
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div css={styles.popListCss}>
          <div className="list-item">
            <div className="list-item-label">空间</div>
            <div className="list-item-option">
              <ProjectSelect
                value={projectId}
                onChange={(v) => {
                  setProjectId(v)
                  setSprintId(undefined)
                }}
              />
            </div>
          </div>
          <div className="list-item">
            <div className="list-item-label">迭代</div>
            <div className="list-item-option">
              <SprintSelect value={sprintId} onChange={setSprintId} projectId={projectId?.value} />
            </div>
          </div>
          <div className="btn-ok">
            <Button
              type="primary"
              disabled={!projectId}
              onClick={() => {
                projectId &&
                  props.onChange({
                    projectId,
                    sprintId,
                  })
                setVisible(false)
              }}
            >
              确定
            </Button>
          </div>
        </div>
      }
    >
      <div css={styles.labelCss}>
        {labelText}
        <DownOutlined className="icon" />
      </div>
    </Popover>
  )
}

export default ProjectSprintSelect
