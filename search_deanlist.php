<?php

// A search form of URI dean's list for internal use, implement keyword search

if(isset($_POST['search']))
{
    $valueToSearch = $_POST['valueToSearch'];

    $query = "SELECT * FROM `DeanList` WHERE CONCAT(`ID`, `First Name`, `Middle Name`, `Last Name`,'Home Address 1') LIKE '%".$valueToSearch."%'";
    $search_result = filterTable($query);
    
}
 else {
    $query = "SELECT * FROM `DeanList`";
    $search_result = filterTable($query);
}

function filterTable($query)
{
    $connect = mysqli_connect("localhost", "root", "", "test_1");
    $filter_Result = mysqli_query($connect, $query);
    return $filter_Result;
}

?>

<!-- Web page contents -->
<!DOCTYPE html>
<html>
    <head>
        <title>Search for DeanList</title>
        <style>

            table{
                background-color: lightgray;
            }
           
            td {
                padding: 0.15rem;
                background-color: white;
                font-size: small;
            }
            th{
                padding: 0.6rem 0 0.6rem 0;
                background-color: lightyellow;
                font-size: small;
            }
            input{
                float: right;
                font-size: 0.9rem;
            }

        </style>
    </head>
    <body>

        <form action="search_deanlist.php" method="post">
            <input type="text" name="valueToSearch" placeholder="Value To Search"><br><br>
            <input type="submit" name="search" value="Search"><br><br>
            
            <table>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>MI</th>
                    <th>Last Name</th>
                    <th>Home Address</th>
                    <th>Acad Prog/Subplan</th>
                    <th>Email</th>
                    <th>Term</th>
                </tr>

                <?php while($row = mysqli_fetch_array($search_result)):?>
                <tr>
                    <td><?php echo $row['ID'];?></td>
                    <td><?php echo $row['First Name'];?></td>
                    <td><?php echo $row['Middle Name'];?></td>
                    <td><?php echo $row['Last Name'];?></td>
                    <td><?php echo $row['Home Address 1'], $row['Home Address 2'], ", ", $row['Home City'], ", ", $row['Home State'], " ", $row['Home Zip Code'];?></td>
                    <td><?php echo $row['Academic P 1'], " ", $row['Plan Descr 1'], " ", $row['Subplan1 descr'], " ", $row['Academic P 2'], " ", $row['Plan Descr 2'], " ", $row['Subplan2 descr'], $row['Academic P 3'], " ", $row['Plan Descr 3'], " ", $row['Subplan3 descr'], " ", $row['Academic P 4'], " ", $row['U_DESCR_PLAN4'], " ", $row['Subplan4 descr'];?>
                    <td><?php echo $row['Camp Email ID'];?></td>
                    <td><?php echo $row['Term'];?></td>
                    </td>
                </tr>
                <?php endwhile;?>
            </table>
        </form>
        
    </body>
</html>