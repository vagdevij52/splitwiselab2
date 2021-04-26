import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getErrorMsg from '../../utils/getErrorMsg';
import Grid from '@material-ui/core/Grid';
import { Container, Link, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const SearchResults = () => {
  //const classes = useSearchPageStyles();
  var userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const token = userLocalStorage.token;
  const { query } = useParams();
  const [searchResults , setSearchedResults] = useState("");
  const [grpListParedObj, setGrpListParedObj] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const getSearchResults = async () => {
        setPageLoading(true);
        const groupName = query;
        const headers = {
            'Content-Type': 'application/json' ,
            'Authorization': token
        }
        const body = {
            'groupName':groupName
           }
       // await dispatch(setSearchResults(query));
       axios.post('http://54.227.195.128:4000/api/group/search/',body,{
        headers: headers
        })
       .then((response) =>{
        console.log("Searched Group: "+JSON.stringify(response.data));
        if(response.status===200){
        // var grpNamesList = JSON.stringify(response.data);
        // setGrpListParedObj(JSON.parse(grpNamesList));
        console.log(response.data);
        }else if(response.status===400){
            console.log("Searched group not found");
        }
    }).catch(err=>{
        console.log(err);
    });
}
    getSearchResults();
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

//   if (!searchResults || pageLoading) {
//     return (
//       <Container disableGutters>
//         <Paper variant="outlined" className={classes.mainPaper}>
//           <LoadingSpinner text={'Searching for matches...'} />
//         </Paper>
//       </Container>
//     );
//   }

//   const handleLoadPosts = async () => {
//     try {
//       setLoadingMore(true);
//      // await dispatch(loadSearchPosts(query, page + 1));
//       setPage((prevState) => prevState + 1);
//       setLoadingMore(false);
//     } catch (err) {
//      // dispatch(notify(getErrorMsg(err), 'error'));
//     }
//   };

  return (
    <Container disableGutters>
      <Paper variant="outlined">
        <Paper variant="outlined">
          <Typography
            variant="h6"
            color="secondary"
            // className={classes.infoPaper}
          >
            <SearchIcon fontSize="large" style={{ marginRight: '7px' }} />
            Showing search results for "{query}"
          </Typography>
        </Paper>
        <Grid container spacing="2">
        {
        searchResults.results.map((s) => (
            <Grid item>
            <Link
              key={s.id}
              post={s}
            />
          </Grid>
          ))
          }
        </Grid>
          {/* : (
           <Typography variant="h5" className={classes.noResults}>
             <SentimentVeryDissatisfiedIcon
              className={classes.sorryIcon}
              color="primary"
            />
            Sorry, there were no post results for "{query}"
          </Typography>
        )} */}
      </Paper>
    </Container>
  );
};

export default SearchResults;