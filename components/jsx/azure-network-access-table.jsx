const AzureNetworkTable = () => (
  <>
    <table>
      <caption>Allowed inbound (app servers)</caption>
      <tr>
        <td></td>
        <th scope="col">cd</th>
        <th scope="col">cm</th>
        <th scope="col">next.js</th>
        <th scope="col">si</th>
        <th scope="col">solr</th>
      </tr>
      <tr>
        <th scope="row">cd</th>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
      </tr>
      <tr>
        <th scope="row">cm</th>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
      </tr>
      <tr>
        <th scope="row">next.js</th>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-red-500"></td>
        <td className="bg-red-500"></td>
        <td>next.js is not allowed to identity server and solr</td>
      </tr>
      <tr>
        <th scope="row">si</th>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-red-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td>identity server is not allowed to next.js</td>
      </tr>
      <tr>
        <th scope="row">solr</th>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-red-500"></td>
        <td className="bg-green-500"></td>
        <td className="bg-green-500"></td>
        <td>solr is not allowed to next.js</td>
      </tr>
    </table>
  </>
)
export default AzureNetworkTable
