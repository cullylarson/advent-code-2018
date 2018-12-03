const R = require('ramda')

const input = `
lsrivfotzgdxpkefaqmuiygchj
lsrivfotzqdxpkeraqmewygchj
lsrivfotzbdepkenarjuwygchj
lsrivfotwbdxpkeoaqmunygchj
lsrijfotzbdxpkenwqmuyygchj
lsrivfotzbdxpkensqsuwygcdj
lsrivfotubdxpkenzqmuwyschj
lsrjvwotzbdxpkenaqjuwygchj
lsrtvfotzbdxpkeaaqmuqygchj
lscivzotzbdxpkenaqmuwygcnj
ddrivfotzbdxpkenlqmuwygchj
jsrivfvtzbdxpkenaqmufygchj
csrivfotzxdxpkenaqguwygchj
lprivfbtzbqxpkenaqmuwygchj
lsrnvfotzbnxpkenaqmuwygchk
lsiivfotzbdhpkencqmuwygchj
lsrivfotzbyxpkenaqmzwygchc
lsjivfotqbdxpvenaqmuwygchj
lsrivfotzbdxpkencqmuwvgqhj
lsrivfotzhdxpqenaqouwygchj
lsrivfytzbnxpkenaqmuwygcsj
llrivfotzbdxpkenaqmuwynchd
lsuivfotzbdxpnenaqmuwygchk
lsrtvootnbdxpkenaqmuwygchj
ysrivfotzcdxpkenaqmuwhgchj
lsrivfotxbdxpkefgqmuwygchj
lsrmvfotzbaxpkenaqmuwygfhj
lsrivfothbyxpkxnaqmuwygchj
isrivfotzbdxpkenaqmkwygcht
lhrivfotzbdxpkbnfqmuwygchj
lsrivfotzbmxpkenaqmuwbgdhj
lsrivvotzbdxcoenaqmuwygchj
ssrwvfotzbdjpkenaqmuwygchj
lsrivfotgbwxpkenaqmhwygchj
lsrivfotzbdxpkenaqcuhygcyj
lcdivfotzbdxpkenaqmuwxgchj
ysbivfotzbdxpkenaqmuwkgchj
lsrivfltzbdxxkenaqcuwygchj
lsrivfotzbdxpkgnaqmunegchj
fsqpvfotzbdxpkenaqmuwygchj
lsriifotzbcxpkenaqmubygchj
lsrivfotzjdxpkenaqmugygcjj
tsrikfotzbdxpkeneqmuwygchj
larivfotzbdxpkenaqmwwygcpj
larivfotzbdxpkenaqmuayrchj
lsravfotzbdxpkdoaqmuwygchj
lsrivfotzbixpkenaqvtwygchj
lsrixfotnbdxtkenaqmuwygchj
lsrirfotzbdxpkeneqmuwygchv
lsrivfofzedxpkenaqmswygchj
lwrivfotzvdxpkenaqmuwygfhj
lsrivfotzbdapkenaqmuqygehj
lsrizfotgbdxpkenaqjuwygchj
lsrivioxzbdxpkanaqmuwygchj
lsrivfmtzbdxpkgnaqmuwcgchj
lsrivfotzbdxpkeaaqmuofgchj
lsrivfotvbdxpkenuqmuwygcht
lsrivfothcdxpkenaqouwygchj
lsgivfotzbdxpkenawmuwygchi
lsrigfotzbdxpmonaqmuwygchj
lsrivfotzbdxrkfnaqmuwygcha
lsrivfopobdxpkenaqmuwygchv
lsrejfotzbdxpkvnaqmuwygchj
lsrivfotzbdxplenqqmuwygchz
lsmivfotzbdppkebaqmuwygchj
lsrivfotubdipkewaqmuwygchj
lsrivfodnbhxpkenaqmuwygchj
lsrivfotzbdxpkenaqmkwzgshj
lsrixfotzbdxpkensqmuwygohj
lsdivfotzbdxpkenaqmuwagcwj
lsrimfotzbdxpkenaqmuwygcyu
asnivfotzbdxpkenaqmbwygchj
lseivfltfbdxpkenaqmuwygchj
lsrivfbtzbdxpuenaqmuwyychj
lsziafozzbdxpkenaqmuwygchj
lsrivfotzbdxpkwnaomuwygchg
ldrivfotzbdxpkeniqmuwygihj
lsrivfotzbdxpkenaqhdwycchj
lsrigfotzbdxphenaqmuwynchj
lsripfotzbdxpgenaqmuwygchh
lsrgvfoczbdxpkenaqmuwygihj
lsribfotzbgxpkenaqhuwygchj
lsrkvfotztdxpienaqmuwygchj
lsrivfohzbdxpkenaqrxwygchj
lsrivfoszbdxpkenavmuwygvhj
lsrivfstzblxpkcnaqmuwygchj
lzrivfotzbdxpkegaqmuwygchv
lsrivtotzbdxpkenaqrumygchj
lsgivfotzbdwpkenaqmuwhgchj
lurivfotybdxpkenaqmuwygchg
lsrivfogzbdxpkmnrqmuwygchj
lsrivgotzbdxpkengqmuwygcwj
lirivfbyzbdxpkenaqmuwygchj
lwrivfotzbdxpkbjaqmuwygchj
lsrivkotzbqxakenaqmuwygchj
lxrivfotzbdxpkenaqmuwygshy
lxxivfqtzbdxpkenaqmuwygchj
lsrivfohzbdxpzenaqmuzygchj
lsrivfotzndxekenaqmuwygcvj
lsrdvfotzbdxpkenaqguiygchj
lsrivfotzbdxpiehaqauwygchj
atrivfotzbdxpkenaqmuwygchz
lsrivfovzbdxpkenaqmuvygcwj
lsrivfotzmdxpkennqmuwyxchj
luvcvfotzbdxpkenaqmuwygchj
lsriqfotzbdxpbenaqmuwygchg
bsoivfotzudxpkenaqmuwygchj
lsrivfotzbdxphenaqmhwxgchj
lsrivfotzbdxpkenasmuwjgchw
lsrivdotzboxpkenaqmuwykchj
lsqivfotzbdxcdenaqmuwygchj
lsrivfktzndypkenaqmuwygchj
lwrivfotzbdxpkenaqmuolgchj
lkrivfowzbdxpkenaqmbwygchj
lsrivhotzbdxpkenaqyuwygvhj
lsruvfotzbdxpkecaqmukygchj
lsrivdotzbdsskenaqmuwygchj
lsrivfotzbdxpkanaqmuwygcmc
lsrgvfotubdxpkenrqmuwygchj
psrivfotzbdxpkenaqmutygchd
lsrivfitzbdxpkenagmiwygchj
lsrivfotzbdxpkbnaqauwyrchj
lsrivfotvbdxpjenaqmuwygchr
lsrdvfoyzbjxpkenaqmuwygchj
vsrivfothbdxpkenaqmuwyychj
lyrivfotzpdxpkepaqmuwygchj
lsgbqfotzbdxpkenaqmuwygchj
lxrivfotzbdxpkenegmuwygchj
lsrivfokzbdxpkenaqnuwyxchj
lsrivfotubmxpkexaqmuwygchj
lswivfvtzbdxpkenaqmuwygcgj
lsrivfonzbdxpkenaqiuwygchc
isrivlotzbdxpkenaqmuwygchf
lsrilfozzbdxpkenaqmuwygcvj
wsrivfotzbdxpkepaqmuwegchj
lsrivfrtzbrxpkenaqquwygchj
lsrivfotzbdxpkeqaqmuoygjhj
lsrivfotzmdxpkenaqmuwyxchg
lsrnvfotzbzxxkenaqmuwygchj
ldrivfotzbdxpkenaqmlxygchj
lsriofotzbdxpkenaqmwwmgchj
lsrivfotzodxjkenaqmuwyglhj
lsriviotzbdxpkegaqguwygchj
lsrimfotzbdxpkanaqmuwygshj
lwrzvfotzbdxpkenaqmuwygcfj
lirivfotzbdxkkenvqmuwygchj
lsrivfotlbdxpkeoaqmuwygahj
lsxivfotzbdxpkenaqmuwwgchi
lsrivfotzbdxpkenaqmukygzzj
lsrtvfotzbdxskenaqmuwygcij
lsgilfotzbdxpdenaqmuwygchj
lsriyfotbbdxpkenaqmuwygchm
lsrivfotabdxpkenaqmuwyghhs
xsrizfotzbdxpkenaqmuwygczj
lsrivfotybdxpkenaqquwygchx
lsrzvfofzbdxpktnaqmuwygchj
xsripfotzbdxpkenaqmqwygchj
lsrivfotzbdspkenahmuwugchj
lsmivfotzbdbpkenaqmuwygchy
lsruvfotzbdxpkenaqqpwygchj
lrmivfotzbdxpkenaqguwygchj
lsnivfotzbdlpketaqmuwygchj
lsrivfotzbdxjketaqjuwygchj
lsrivxotzbdchkenaqmuwygchj
lsrivootzbdxpkenaqmuwybmhj
tsrivfdtzbdxpkenaqmuwpgchj
lsrivmotzbdxpkxnaqmuwcgchj
lsrivfotzadepkenaqmuwyichj
dsrivfotrbdxpkenaqmuwtgchj
lsrivfhtzbdxvkenoqmuwygchj
lsrivfotzvdxbkenaqmbwygchj
lsrxvcotzbdxpkenaqmuwygvhj
lsrivfotzbdxykenaqmuwfgcha
lsbivfotzbdxpkenaqmuwfvchj
lfrivfotzbdcpkgnaqmuwygchj
lsrivfotzbdxpwegdqmuwygchj
lsrivfotyjdupkenaqmuwygchj
gsrivfotzbdxpkenaemuwcgchj
lsrivfodqbdxpkenaqmuwygchg
lsrivfoczbdxpkenaqnuwwgchj
lsrivpouzbhxpkenaqmuwygchj
llbivuotzbdxpkenaqmuwygchj
lfrivfofzbdxpkenaqmuwygchb
lsrivfotzbdxpkenaumuwgghhj
lsrivfotzbdxqaenazmuwygchj
lsrivfotzbgxpkenkqmqwygchj
lsrivfotzbdxpkensqiawygchj
ljrijfotzbdxppenaqmuwygchj
lsrivfoszbdxpkrnlqmuwygchj
lsrijfotzbdxpcfnaqmuwygchj
lsrivfotzbdopkebaqmuwytchj
lsrivfonzbdxnkenalmuwygchj
larivfouzbvxpkenaqmuwygchj
lsryvfotzbdxpkensqmuwygyhj
lsrivfztzbdxpkenaxmuwigchj
lqkivfotzbdxpkenaqmuwygcht
wsdivfotzbdxpkenbqmuwygchj
lsrlvfotzadxpkencqmuwygchj
lsrivfotoohxpkenaqmuwygchj
lsrivfbuzbdfpkenaqmuwygchj
psrivfotzbdxpkenawmuqygchj
lsrivmotzbdxpkxnaqmuwcychj
lsrivfotzvdgpkenaqmuwlgchj
lcfivfstzbdxpkenaqmuwygchj
lsrivfotzbddpkeeaqmuwygcij
lsribfotzbdxpkenaqmuwugcyj
lsrivfotzbdxakenaqmkwygyhj
lsrivfotzbdxpkegaqmupyvchj
lfrivfitzbdxpkenaqmuwygcrj
lskivfotzbdxpkenaqmuwygwwj
lsrivfotzddnpkenaqmuwfgchj
lsrivfotzbdiukhnaqmuwygchj
lfrivfotzbdxpkendqmuwygctj
ljriqfotzvdxpkenaqmuwygchj
lsrivfotzbdxpkeskqpuwygchj
lsrivfotzbdxpkehaqmupygghj
lsriyfotsbdxpkedaqmuwygchj
lsrivfotzbdsjsenaqmuwygchj
lsrivfotzbwxpienaqmuaygchj
lsrivrotzbdxpkenaumuwygahj
lsrivpotzfdxpkenaqmuwyjchj
lsrivfomebdxpoenaqmuwygchj
lswigfotpbdxpkenaqmuwygchj
lsrivnotzbdxpkenaqmufrgchj
lsrivfolbbdxpkenaqmuwygcqj
lirivfotzbdxpknnaqeuwygchj
lsrrvfxtzbdxpaenaqmuwygchj
lspivfotzbdxpnsnaqmuwygchj
lsrivfotzbyxpkenaqmawygcij
lsrivfotzbfxpbenaqmuwyichj
lsrivfotzbvxpjeyaqmuwygchj
lyrihfotzbdxpknnaqmuwygchj
uurivfotzbdxpkenaqmubygchj
lsrivfotgbdxnkenaxmuwygchj
lsriffotzbdxpkdnaqmuwygshj
lsrisfotzbdxpkenaqzjwygchj
lsrilfotzbdxpkenaqmuwygtgj
lsrivfotzbdxzkenaqmuhmgchj
hsrivfotzbdxprenaqauwygchj
tsrevfotzbdupkenaqmuwygchj
lsrizfotzbpxpkenaqmuwyrchj
lsdivfotzbxxpkenaqmuhygchj
lsrivfttzbyxpkenaqmuaygchj
lsrivfotzodxpwenaqzuwygchj
lsrivfotfbdxpkenaqvuwygyhj
lsrivfotzzdxpknnaqmulygchj
lsrjvvotzbdxpkenaqmuwjgchj
lsrivuotzbdxpkeiaqxuwygchj
lsrivfotzbdxpzenaqmmwygthj
lsrivfotzbdxphenaqmuwyghvj
`

const similar = (a, b) => {
    if(a.length != b.length) return false

    let numDifferent = 0

    for(let i = 0; i < a.length; i++) {
        if(a[i] !== b[i]) numDifferent++

        if(numDifferent > 1) return false
    }

    return true
}

const removeDiff = (a, b) => {
    return a.reduce((acc, _, i) => {
        return a[i] === b[i]
            ? acc + a[i]
            : acc
    }, '')
}

const findSimilar = (xs) => {
    return xs.reduce((acc, a, i) => {
        if(acc) return acc

        return xs.reduce((acc, b, j) => {
            if(acc) return acc
            if(i === j) return acc

            return similar(a, b)
                ? removeDiff(a, b)
                : acc
        }, null)
    }, null)
}

const report = x => {
    console.log(x)
    return x
}

R.compose(
    report,
    findSimilar,
    R.map(R.split('')),
    R.filter(x => !!x),
    R.map(R.trim),
    R.split('\n'),
)(input)
