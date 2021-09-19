import { gql, useQuery } from "@apollo/client";
import {
  EuiBasicTable,
  EuiButton,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiLoadingLogo,
} from "@elastic/eui";
import React, { Fragment } from "react";
import { useHistory } from "react-router";

const PROJECT_LISTING_QUERY = gql`
  query {
    projects {
      id
      Name
      createdAt
      Services {
        id
        Name
        Disabled
        Image
        Port
      }
      Administrators {
        id
        email
      }
      Members {
        id
        email
      }
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(PROJECT_LISTING_QUERY);
  const history = useHistory();

  console.log(data);

  if (loading) {
    return (
      <EuiEmptyPrompt
        icon={<EuiLoadingLogo logo="logoKibana" size="xl" />}
        title={<h5>Loading projects</h5>}
      />
    );
  }
  // const [pageIndex, setPageIndex] = useState(0);
  // const [pageSize, setPageSize] = useState(5);
  // const [sortField, setSortField] = useState("firstName");
  // const [sortDirection, setSortDirection] = useState("asc");
  // const [selectedItems, setSelectedItems] = useState([]);
  // const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState({});
  // const onTableChange = ({ page = {}, sort = {} }) => {
  //   // const { index: pageIndex, size: pageSize } = page;
  //   // const { field: sortField, direction: sortDirection } = sort;
  //   // setPageIndex(pageIndex);
  //   // setPageSize(pageSize);
  //   // setSortField(sortField);
  //   // setSortDirection(sortDirection);
  // };

  // const onSelectionChange = (...params: any) => {
  //   setSelectedItems(selectedItems);
  // };

  // const onClickDelete = () => {
  //   // store.deleteUsers(...selectedItems.map((user) => user.id));
  //   // setSelectedItems([]);
  // };

  // const renderDeleteButton = () => {
  //   if (selectedItems.length === 0) {
  //     return;
  //   }
  //   return (
  //     <EuiButton color="danger" iconType="trash" onClick={onClickDelete}>
  //       Delete {selectedItems.length} Users
  //     </EuiButton>
  //   );
  // };

  // const columns = [
  //   {
  //     field: "firstName",
  //     name: "First Name",
  //     sortable: true,
  //     truncateText: true,
  //     mobileOptions: {
  //       render: (item: any) => (
  //         <span>
  //           {item.firstName} {item.lastName}
  //         </span>
  //       ),
  //       header: false,
  //       truncateText: false,
  //       enlarge: true,
  //       fullWidth: true,
  //     },
  //   },
  //   {
  //     field: "lastName",
  //     name: "Last Name",
  //     truncateText: true,
  //     mobileOptions: {
  //       show: false,
  //     },
  //   },
  //   {
  //     field: "dateOfBirth",
  //     name: "Date of Birth",
  //     schema: "date",
  //     render: (date: any) => formatDate(date, "dobLong"),
  //     sortable: true,
  //   },
  //   {
  //     name: "Actions",
  //     actions: [
  //       {
  //         name: "Clone",
  //         description: "Clone this person",
  //         type: "icon",
  //         icon: "copy",
  //         onClick: () => "",
  //       },
  //     ],
  //   },
  //   {
  //     align: RIGHT_ALIGNMENT,
  //     width: "40px",
  //     isExpander: true,
  //     render: (item: any) => (
  //       <div>foo</div>
  //       // <EuiButtonIcon
  //       //   onClick={() => toggleDetails(item)}
  //       //   aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
  //       //   iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
  //       // />
  //     ),
  //   },
  // ];

  // const pagination = {
  //   pageIndex: pageIndex,
  //   pageSize: pageSize,
  //   totalItemCount: 1,
  //   pageSizeOptions: [3, 5, 8],
  // };

  // const sorting = {
  //   sort: {
  //     field: sortField,
  //     direction: sortDirection,
  //   },
  // };

  if (!data.projects || data.projects.length === 0) {
    return (
      <EuiEmptyPrompt
        iconType="dataVisualizer"
        iconColor="default"
        title={<h2>No projects found</h2>}
        titleSize="xs"
        body={
          <Fragment>
            <p>
              Create a new project to get started. Once you create a new
              project, you can add services to the project to run your
              workloads.
            </p>
          </Fragment>
        }
        actions={
          <EuiButton
            size="s"
            color="primary"
            fill
            iconType="listAdd"
            onClick={() => history.push("/projects/create")}
          >
            Create a project
          </EuiButton>
        }
      />
    );
  }

  return (
    <>
      <EuiFlexGroup gutterSize="l">
        <EuiBasicTable
          items={[
            {
              // id: "1",
              firstName: "john",
              lastName: "doe",
              // github: "johndoe",
              // dateOfBirth: Date.now(),
              // nationality: "NL",
              // online: true,
            },
          ]}
          itemId="id"
          // itemIdToExpandedRowMap={itemIdToExpandedRowMap}
          isExpandable={true}
          hasActions={true}
          columns={[
            {
              name: "firstName",
              field: "firstName",
            },
            {
              name: "lastName",
              field: "lastName",
            },
          ]}
          // pagination={pagination}
          // sorting={sorting} // @ts-ignore
          // onChange={onTableChange}
        />
      </EuiFlexGroup>
    </>
  );
};
